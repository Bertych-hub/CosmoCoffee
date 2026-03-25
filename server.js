const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Настройка транспортера для отправки писем (замени на свои реальные данные)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'твоя_почта@gmail.com',
        pass: 'твой_пароль_приложения'
    }
});

// Эндпоинт для формы обратной связи
app.post('/api/contact', (req, res) => {
    const { callsign, email, message } = req.body;

    const mailOptions = {
        from: 'твоя_почта@gmail.com',
        to: 'orbit@cosmocoffee.space', // Куда приходят сигналы
        subject: `Новый сигнал от позывного: ${callsign}`,
        text: `Позывной: ${callsign}\nЗвездная почта: ${email}\nСообщение: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Сбой связи. Сигнал потерян.' });
        }
        res.status(200).json({ success: true, message: 'Сигнал успешно доставлен на базу!' });
    });
});

// Эндпоинт для покупки кофе
app.post('/api/purchase', (req, res) => {
    const { coffeeId, coffeeName, priceOK, priceUSD } = req.body;
    
    // Здесь должна быть логика списания ОК из БД пользователя или интеграция с платежкой для USD
    console.log(`[ПОКУПКА] Заказ на: ${coffeeName}. Списано: ${priceOK} ОК / ${priceUSD}`);

    res.status(200).json({ 
        success: true, 
        message: `Вы успешно приобрели ${coffeeName}! Ждем вас на орбите.` 
    });
});

app.listen(PORT, () => {
    console.log(`Центр управления CosmoCoffee запущен на порту ${PORT}`);
});