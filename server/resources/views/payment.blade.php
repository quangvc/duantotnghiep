<form action="{{ url('/vnpay-payment') }}" method="post">
    @csrf
    <input type="text" name="id"><br>
    <input type="text" name="bank_code"><br>
    <br>
    <button type="submit" name="redirect">Thanh toans VNPay</button>
</form>
