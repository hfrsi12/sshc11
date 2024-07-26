<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $amount = $_POST['amount'];
    $email = $_POST['email'];

    // افتراض وجود دالة لإرسال بريد إلكتروني
    function sendEmail($to, $subject, $message) {
        // إعدادات البريد الإلكتروني وإرساله
    }

    // رسالة التأكيد للسحب
    $message = "تم تقديم طلب السحب بقيمة $amount.\nيرجى تأكيد الطلب.";
    sendEmail($email, "تأكيد طلب السحب", $message);

    echo json_encode(['success' => true, 'message' => 'تم تقديم طلب السحب بنجاح. يرجى تأكيد الطلب عبر البريد الإلكتروني.']);
} else {
    echo json_encode(['success' => false, 'message' => 'طلب غير صالح.']);
}
?>
