document.addEventListener('DOMContentLoaded', () => {
    // Бургер меню
    const burgerBtn = document.getElementById('burgerBtn');
    const sideMenu = document.getElementById('sideMenu');

    if(burgerBtn && sideMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            sideMenu.classList.toggle('open');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !burgerBtn.contains(e.target) && sideMenu.classList.contains('open')) {
                burgerBtn.classList.remove('active');
                sideMenu.classList.remove('open');
            }
        });
    }

    // Обработка формы контактов
    const cosmoForm = document.getElementById('cosmoForm');
    if (cosmoForm) {
        cosmoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = cosmoForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'ОТПРАВКА...';

            const formData = {
                callsign: cosmoForm.querySelector('input[type="text"]').value,
                email: cosmoForm.querySelector('input[type="email"]').value,
                message: cosmoForm.querySelector('textarea').value
            };

            try {
                // Раскомментируй и измени порт, когда запустишь сервер
                /*
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                alert(result.message);
                */
                
                // Имитация успешной отправки для фронтенда без сервера
                setTimeout(() => {
                    alert('Сигнал успешно доставлен на базу!');
                    cosmoForm.reset();
                    btn.innerText = originalText;
                }, 1000);

            } catch (error) {
                alert('Ошибка передачи сигнала.');
                btn.innerText = originalText;
            }
        });
    }
});