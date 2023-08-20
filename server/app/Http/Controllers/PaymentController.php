<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Coupon;
use App\Enums\BookingStatusEnum;
use Exception;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SendMailPaymentNotification;

class PaymentController extends Controller
{
    public function vnpay_payment(Request $request)
    {

        $vnp_Returnurl = env('APP_URL')."/booking/payment-done"; //trang trả về sau khi thanh toán xong
        $vnp_TmnCode = "ENZCQ3F2";
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

        $booking = Booking::find($request->id);

        $vnp_TxnRef = $booking->booking_number; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
        $vnp_OrderInfo = 'Thanh toan dat phong khach san. ID booking ' . $booking->booking_number;
        $vnp_OrderType = 170003;
        $vnp_Amount = $booking->total_price * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = $request->bank_code;
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version
        //Billing

        // $vnp_TxnRef = 'HD8_83291499';
        // $vnp_OrderInfo = 'Thanh toan dat phong khach san. ID booking ';
        // $vnp_OrderType = 170003;
        // $vnp_Amount = 1000000 * 100;
        // $vnp_Locale = 'vn';
        // $vnp_BankCode = 'NCB';

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (env('VNP_HASHSECRET')) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, env('VNP_HASHSECRET'));
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );

        return $returnData;

        // if (isset($_POST['redirect'])) {
        //     header('Location: ' . $vnp_Url);
        //     die();
        // } else {
        //     return response([
        //         "Error redirect"
        //     ]);
        // echo json_encode($returnData);
        // }
    }


    public function paymentReturn(Request $request)
    {

        $inputData = $request->toArray();
        $returnData = array();

        foreach ($_GET as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, env('VNP_HASHSECRET'));
        $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
        $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
        $vnp_Amount = $inputData['vnp_Amount'] / 100; // Số tiền thanh toán VNPAY phản hồi

        $Status = 0; // Là trạng thái thanh toán của giao dịch chưa có IPN lưu tại hệ thống của merchant chiều khởi tạo URL thanh toán.
        $booking_number = $inputData['vnp_TxnRef'];
        try {
            //Check Orderid
            //Kiểm tra checksum của dữ liệu
            if ($secureHash == $vnp_SecureHash) {
                //Lấy thông tin đơn hàng lưu trong Database và kiểm tra trạng thái của đơn hàng, mã đơn hàng là: $orderId
                //Việc kiểm tra trạng thái của đơn hàng giúp hệ thống không xử lý trùng lặp, xử lý nhiều lần một giao dịch
                //Giả sử: $order = mysqli_fetch_assoc($result);


                $booking = Booking::where('booking_number', $booking_number)->first();
                // $booking = Booking::find(8);

                if ($booking != NULL) {
                    if ($booking->total_price == $vnp_Amount) //Kiểm tra số tiền thanh toán của giao dịch: giả sử số tiền kiểm tra là đúng. //$booking["Amount"] == $vnp_Amount
                    {
                        if ($booking->status !== NULL && $booking->status == 0) {
                            if ($inputData['vnp_ResponseCode'] == '00' || $inputData['vnp_TransactionStatus'] == '00') {
                                // Trạng thái thanh toán thành công
                                $booking->update([
                                    'status' => BookingStatusEnum::RESERVED
                                ]);
                                if ($booking->coupon_id) {
                                    $coupon = Coupon::find($booking->coupon_id);
                                    $coupon->update([
                                        $coupon->decrement('quantity')
                                    ]);
                                }
                                // Notification::route('mail', $booking->guest_email)->notify(new SendMailPaymentNotification($booking->booking_number));
                            }

                            //Trả kết quả về cho VNPAY: Website/APP TMĐT ghi nhận yêu cầu thành công
                            $returnData['RspCode'] = '00';
                            $returnData['Message'] = 'Confirm Success';
                        } else {
                            $returnData['RspCode'] = '02';
                            $returnData['Message'] = 'Order already confirmed';
                        }
                    } else {
                        $returnData['RspCode'] = '04';
                        $returnData['Message'] = 'invalid amount';
                    }
                } else {
                    $returnData['RspCode'] = '01';
                    $returnData['Message'] = 'Order not found';
                }
            } else {
                $returnData['RspCode'] = '97';
                $returnData['Message'] = 'Invalid signature';
            }
        } catch (Exception $e) {
            $returnData['RspCode'] = '99';
            $returnData['Message'] = 'Unknow error';
        }
        //Trả lại VNPAY theo định dạng JSON
        // echo json_encode($returnData);
        return response($returnData);
    }

    public function onepay_payment(Request $request) {
        $vpcURL = 'https://mtf.onepay.vn/onecomm-pay/vpc.op' . "?";

        // Remove the Virtual Payment Client URL from the parameter hash as we
        // do not want to send these fields to the Virtual Payment Client.
        // bỏ giá trị url và nút submit ra khỏi mảng dữ liệu
        // unset($_POST["virtualPaymentClientURL"]);
        // unset($_POST["SubButL"]);
        $booking = Booking::find($request[0]);


        $vpc_Merchant = 'ONEPAY';
        $vpc_AccessCode = 'D67342C2';
        $vpc_MerchTxnRef = $booking->booking_number;
        $vpc_OrderInfo = 'Thanh toan dat phong khach san. ID booking ' . $booking->booking_number;
        $vpc_Amount = $booking->total_price * 100;
        $vpc_ReturnURL = 'http://nine09booking.site/booking/payment-done';
        $vpc_Version = '2';
        $vpc_Command = 'pay';
        $vpc_Locale = 'vn';
        $vpc_Currency = 'VND';

        $data = array(
            'vpc_Merchant' => $vpc_Merchant,
            'vpc_AccessCode' => $vpc_AccessCode,
            'vpc_MerchTxnRef' => $vpc_MerchTxnRef,
            'vpc_OrderInfo' => $vpc_OrderInfo,
            'vpc_Amount' => $vpc_Amount,
            'vpc_ReturnURL' => $vpc_ReturnURL,
            'vpc_Version' => $vpc_Version,
            'vpc_Command' => $vpc_Command,
            'vpc_Locale' => $vpc_Locale,
            'vpc_Currency' => $vpc_Currency,
        );

    //$stringHashData = $SECURE_SECRET; *****************************Khởi tạo chuỗi dữ liệu mã hóa trống*****************************
    $stringHashData = "";
    // sắp xếp dữ liệu theo thứ tự a-z trước khi nối lại
    // arrange array data a-z before make a hash
    ksort ($data);

    // set a parameter to show the first pair in the URL
    // đặt tham số đếm = 0
    $appendAmp = 0;

    foreach($data as $key => $value) {

        // create the md5 input and URL leaving out any fields that have no value
        // tạo chuỗi đầu dữ liệu những tham số có dữ liệu
        if (strlen($value) > 0) {
            // this ensures the first paramter of the URL is preceded by the '?' char
            if ($appendAmp == 0) {
                $vpcURL .= urlencode($key) . '=' . urlencode($value);
                $appendAmp = 1;
            } else {
                $vpcURL .= '&' . urlencode($key) . "=" . urlencode($value);
            }
            //$stringHashData .= $value; *****************************sử dụng cả tên và giá trị tham số để mã hóa*****************************
            if ((strlen($value) > 0) && ((substr($key, 0,4)=="vpc_") || (substr($key,0,5) =="user_"))) {
                $stringHashData .= $key . "=" . $value . "&";
            }
        }
    }
    //*****************************xóa ký tự & ở thừa ở cuối chuỗi dữ liệu mã hóa*****************************
    $stringHashData = rtrim($stringHashData, "&");
    // Create the secure hash and append it to the Virtual Payment Client Data if
    // the merchant secret has been provided.
    // thêm giá trị chuỗi mã hóa dữ liệu được tạo ra ở trên vào cuối url
    if (strlen(env('SECURE_SECRET')) > 0) {
        //$vpcURL .= "&vpc_SecureHash=" . strtoupper(md5($stringHashData));
        // *****************************Thay hàm mã hóa dữ liệu*****************************
        $vpcURL .= "&vpc_SecureHash=" . strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*',env('SECURE_SECRET'))));
    }

    // FINISH TRANSACTION - Redirect the customers using the Digital Order
    // ===================================================================
    // chuyển trình duyệt sang cổng thanh toán theo URL được tạo ra
    // header("Location: ".$vpcURL);
    // return redirect()->to($vpcURL);
    // header('Location: ' . $vpcURL);
    // $vpcURL = 'hello';
    // return $vpcURL;
    return response()->json($vpcURL);

    // *******************
    // END OF MAIN PROGRAM
    // *******************
    }


    public function onepayReturn(Request $request) {

    $vpc_Txn_Secure_Hash = $_REQUEST ["vpc_SecureHash"];
    unset ( $_REQUEST ["vpc_SecureHash"] );

    // set a flag to indicate if hash has been validated
    $errorExists = false;

    if (strlen ( env('SECURE_SECRET') ) > 0 && $_REQUEST ["vpc_TxnResponseCode"] != "7" && $_REQUEST ["vpc_TxnResponseCode"] != "No Value Returned") {
        ksort($_REQUEST);
        //$stringHashData = $SECURE_SECRET;
        //*****************************khởi tạo chuỗi mã hóa rỗng*****************************
        $stringHashData = "";

        // sort all the incoming vpc response fields and leave out any with no value
        foreach ( $_REQUEST as $key => $value ) {
    //        if ($key != "vpc_SecureHash" or strlen($value) > 0) {
    //            $stringHashData .= $value;
    //        }
    //      *****************************chỉ lấy các tham số bắt đầu bằng "vpc_" hoặc "user_" và khác trống và không phải chuỗi hash code trả về*****************************
            if ($key != "vpc_SecureHash" && (strlen($value) > 0) && ((substr($key, 0,4)=="vpc_") || (substr($key,0,5) =="user_"))) {
                $stringHashData .= $key . "=" . $value . "&";
            }
        }
    //  *****************************Xóa dấu & thừa cuối chuỗi dữ liệu*****************************
        $stringHashData = rtrim($stringHashData, "&");


    //    if (strtoupper ( $vpc_Txn_Secure_Hash ) == strtoupper ( md5 ( $stringHashData ) )) {
    //    *****************************Thay hàm tạo chuỗi mã hóa*****************************
        if (strtoupper ( $vpc_Txn_Secure_Hash ) == strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*',env('SECURE_SECRET'))))) {
            // Secure Hash validation succeeded, add a data field to be displayed
            // later.
            $hashValidated = "CORRECT";
        } else {
            // Secure Hash validation failed, add a data field to be displayed
            // later.
            $hashValidated = "INVALID HASH";
        }
    } else {
        // Secure Hash was not validated, add a data field to be displayed later.
        $hashValidated = "INVALID HASH";
    }

    // Define Variables
    // ----------------
    // Extract the available receipt fields from the VPC Response
    // If not present then let the value be equal to 'No Value Returned'
    // Standard Receipt Data
    $amount = null2unknown ( $_REQUEST ["vpc_Amount"] );
    $locale = null2unknown ( $_REQUEST ["vpc_Locale"] );
    //$batchNo = null2unknown ( $_REQUEST ["vpc_BatchNo"] );
    $command = null2unknown ( $_REQUEST ["vpc_Command"] );
    //$message = null2unknown ( $_REQUEST ["vpc_Message"] );
    $version = null2unknown ( $_REQUEST ["vpc_Version"] );
    //$cardType = null2unknown ( $_REQUEST ["vpc_Card"] );
    $orderInfo = null2unknown ( $_REQUEST ["vpc_OrderInfo"] );
    //$receiptNo = null2unknown ( $_REQUEST ["vpc_ReceiptNo"] );
    $merchantID = null2unknown ( $_REQUEST ["vpc_Merchant"] );
    //$authorizeID = null2unknown ( $_REQUEST ["vpc_AuthorizeId"] );
    $merchTxnRef = null2unknown ( $_REQUEST ["vpc_MerchTxnRef"] );
    $transactionNo = null2unknown ( $_REQUEST ["vpc_TransactionNo"] );
    //$acqResponseCode = null2unknown ( $_REQUEST ["vpc_AcqResponseCode"] );
    $txnResponseCode = null2unknown ( $_REQUEST ["vpc_TxnResponseCode"] );

    // This is the display title for 'Receipt' page
    //$title = $_REQUEST ["Title"];


    // This method uses the QSI Response code retrieved from the Digital
    // Receipt and returns an appropriate description for the QSI Response Code
    //
    // @param $responseCode String containing the QSI Response Code
    //
    // @return String containing the appropriate description
    //
    //////////////////////// CONFIRM /////////////////////
    if($hashValidated=="CORRECT"){
        echo "responsecode=1&desc=confirm-success";
    }
    else echo "responsecode=0&desc=confirm-fail";

    /////////////////////////////////////////////////////
    //  ----------------------------------------------------------------------------

    $transStatus = "";
    if($hashValidated=="CORRECT" && $txnResponseCode=="0"){
        $booking = Booking::where('booking_number', $merchTxnRef)->first();
        $booking->update([
            'status' => BookingStatusEnum::RESERVED
        ]);
        if ($booking->coupon_id) {
            $coupon = Coupon::find($booking->coupon_id);
            $coupon->update([
                $coupon->decrement('quantity')
            ]);
        }
        Notification::route('mail', $booking->guest_email)->notify(new SendMailPaymentNotification($booking->booking_number));
        $transStatus = "Giao dịch thành công";
    }elseif ($txnResponseCode!="0"){
        $transStatus = "Giao dịch thất bại";
    }elseif ($hashValidated=="INVALID HASH"){
        $transStatus = "Giao dịch Pendding";
    }

    function getResponseDescription($responseCode) {
        switch ($responseCode) {
            case "0" :
                $result = "Giao dịch thành công - Approved";
                break;
            case "1" :
                $result = "Ngân hàng từ chối giao dịch - Bank Declined";
                break;
            case "3" :
                $result = "Mã đơn vị không tồn tại - Merchant not exist";
                break;
            case "4" :
                $result = "Không đúng access code - Invalid access code";
                break;
            case "5" :
                $result = "Số tiền không hợp lệ - Invalid amount";
                break;
            case "6" :
                $result = "Mã tiền tệ không tồn tại - Invalid currency code";
                break;
            case "7" :
                $result = "Lỗi không xác định - Unspecified Failure ";
                break;
            case "8" :
                $result = "Số thẻ không đúng - Invalid card Number";
                break;
            case "9" :
                $result = "Tên chủ thẻ không đúng - Invalid card name";
                break;
            case "10" :
                $result = "Thẻ hết hạn/Thẻ bị khóa - Expired Card";
                break;
            case "11" :
                $result = "Thẻ chưa đăng ký sử dụng dịch vụ - Card Not Registed Service(internet banking)";
                break;
            case "12" :
                $result = "Ngày phát hành/Hết hạn không đúng - Invalid card date";
                break;
            case "13" :
                $result = "Vượt quá hạn mức thanh toán - Exist Amount";
                break;
            case "21" :
                $result = "Số tiền không đủ để thanh toán - Insufficient fund";
                break;
            case "99" :
                $result = "Người sủ dụng hủy giao dịch - User cancel";
                break;
            default :
                $result = "Giao dịch thất bại - Failured";
        }
        return $result;
    }

    //  -----------------------------------------------------------------------------
    // If input is null, returns string "No Value Returned", else returns input
    function null2unknown($data) {
        if ($data == "") {
            return "No Value Returned";
        } else {
            return $data;
        }
    }

    }
}
