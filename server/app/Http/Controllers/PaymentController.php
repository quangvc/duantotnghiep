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

        $vnp_Returnurl = "http://localhost:4300/booking/payment-done"; //trang trả về sau khi thanh toán xong
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

    public function onepay_payment() {

    /* -----------------------------------------------------------------------------

    Version 2.0

    @author OnePAY

    ------------------------------------------------------------------------------*/

    // *********************
    // START OF MAIN PROGRAM
    // *********************

    // Define Constants
    // ----------------
    // This is secret for encoding the MD5 hash
    // This secret will vary from merchant to merchant
    // To not create a secure hash, let SECURE_SECRET be an empty string - ""
    // $SECURE_SECRET = "secure-hash-secret";
    // Khóa bí mật - được cấp bởi OnePAY
    $SECURE_SECRET = "A3EFDFABA8653DF2342E8DAC29B51AF0";

    // add the start of the vpcURL querystring parameters
    // *****************************Lấy giá trị url cổng thanh toán*****************************
    $vpcURL = 'https://mtf.onepay.vn/onecomm-pay/vpc.op' . "?";

    // Remove the Virtual Payment Client URL from the parameter hash as we 
    // do not want to send these fields to the Virtual Payment Client.
    // bỏ giá trị url và nút submit ra khỏi mảng dữ liệu
    // unset($_POST["virtualPaymentClientURL"]); 
    // unset($_POST["SubButL"]);

        $vpc_Merchant = 'ONEPAY';
        $vpc_AccessCode = 'D67342C2';
        $vpc_MerchTxnRef = now();
        $vpc_OrderInfo = 'JSECURETEST01';
        $vpc_Amount = $_POST['total_price'] * 100;
        $vpc_ReturnURL = 'http://localhost:4300/booking/payment-done';
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
    if (strlen($SECURE_SECRET) > 0) {
        //$vpcURL .= "&vpc_SecureHash=" . strtoupper(md5($stringHashData));
        // *****************************Thay hàm mã hóa dữ liệu*****************************
        $vpcURL .= "&vpc_SecureHash=" . strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*',$SECURE_SECRET)));
    }

    // FINISH TRANSACTION - Redirect the customers using the Digital Order
    // ===================================================================
    // chuyển trình duyệt sang cổng thanh toán theo URL được tạo ra
    // header("Location: ".$vpcURL);
    return redirect()->to($vpcURL);

    // *******************
    // END OF MAIN PROGRAM
    // *******************


    }
}
