<!doctype html>
<html lang="en">

<head>
  <title>Reset password</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/signup.css') }}">
</head>

<body>
    
<form action="{{ route('password.update') }}" style="border:1px solid #ccc" class="m-5 py-3 rounded-3 w-50" method="post">
  @csrf
  {{-- <input type="hidden" name="_token" value=""> --}}
    <div class="container">
      <h1>Reset password</h1>
      <p>Please fill in this form to reset password.</p>
      <hr>

      <input type="hidden" name="token" value="{{ $token }}">

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required :value="old('email')">
  
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" required>
  
      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="password_confirmation" required>
  
      <div class="clearfix">
        <button type="submit" class="resetpassbtn">Reset Password</button>
      </div>
    </div>
  </form>

<!-- Bootstrap JavaScript Libraries -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
</script>
</body>

</html>