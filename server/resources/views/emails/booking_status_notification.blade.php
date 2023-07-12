<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Status Notification</title>
</head>

<body>
    <h1>Booking Status Notification</h1>

    <p>Dear {{ $booking->guest_name }},</p>

    <p>Your booking with reference number {{ $booking->reference_number }} has been updated.</p>

    <p>New status: {{ $booking->status }}</p>

    <p>Thank you for choosing our service.</p>

    <p>Best regards,</p>
    <p>Your Company</p>
</body>

</html>