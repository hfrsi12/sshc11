fetch('https://your-ngrok-url/api-endpoint', {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

axios.get('https://your-ngrok-url/api-endpoint', {
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error:', error);
});










const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = 8080;

// إعداد اتصال Supabase
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// إعداد CORS لتجاوز تحذير ngrok
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['ngrok-skip-browser-warning', 'Content-Type']
}));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// نقطة نهاية لعرض العروض المفعلة
app.get('/activated-offers', async (req, res) => {
    const { data, error } = await supabase
        .from('Offers')
        .select('*')
        .eq('status', 'activated');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.json(data);
    }
});

// نقطة نهاية لعرض الإيداعات المعلقة
app.get('/pending-deposits', async (req, res) => {
    const { data, error } = await supabase
        .from('Deposits')
        .select('*')
        .eq('status', 'pending');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.json(data);
    }
});

// نقطة نهاية لعرض طلبات السحب
app.get('/withdrawal-requests', async (req, res) => {
    const { data, error } = await supabase
        .from('Withdrawals')
        .select('*')
        .eq('status', 'pending');

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.json(data);
    }
});

// نقطة نهاية لتأكيد إيداع
app.post('/confirm-deposit', async (req, res) => {
    const { username, depositId } = req.body;

    const { data, error } = await supabase
        .from('Deposits')
        .update({ status: 'confirmed' })
        .eq('id', depositId)
        .eq('username', username);

    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        // تحديث رصيد المستخدم
        const { data: userData, error: userError } = await supabase
            .from('Users')
            .update({ balance: supabase.raw('balance + ?', [data.amount]) })
            .eq('username', username);

        if (userError) {
            res.status(500).json({ error: userError.message });
        } else {
            res.json({ message: 'تم تأكيد الإيداع وتحديث الرصيد.' });
        }
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`الخادم يستمع على المنفذ ${port}`);
});
