<form action="{{ url('/vnpay-payment') }}" method="post">
    @csrf
    <input type="text" name="id" value="8"><br>
    <input type="text" name="bank_code" value="MBBANK"><br>
    <br>
    <button type="submit" name="redirect">Thanh toans VNPay</button>
</form>
