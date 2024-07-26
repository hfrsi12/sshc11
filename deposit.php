<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $amount = $_POST['amount'];
    $trc20Address = $_POST['trc20Address'];
    $email = $_POST['email'];

    // افتراض وجود دالة لإرسال بريد إلكتروني
    function sendEmail($to, $subject, $message) {
        // إعدادات البريد الإلكتروني وإرساله
    }

    // رسالة التأكيد للإيداع
    $message = "تم تقديم طلب الإيداع بقيمة $amount إلى العنوان TRC-20 التالي: $trc20Address.\nيرجى تأكيد الطلب.";
    sendEmail($email, "تأكيد طلب الإيداع", $message);

    echo json_encode(['success' => true, 'message' => 'تم تقديم طلب الإيداع بنجاح. يرجى تأكيد الطلب عبر البريد الإلكتروني.']);
} else {
    echo json_encode(['success' => false, 'message' => 'طلب غير صالح.']);
}
?>
