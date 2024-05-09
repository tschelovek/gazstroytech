document.addEventListener('DOMContentLoaded', () => {

    /**
     *
     * Бургер меню
     *
     */
    document.getElementById('burgerButton')?.addEventListener('click', e => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        document.querySelector('.header__menu')?.classList.toggle('active');
    })

    // document.querySelectorAll('.nav_header .header__link')
    //     .forEach(link => link.addEventListener('click', () => {
    //             document.querySelector('.nav_header').classList.remove('active');
    //             document.getElementById('burgerButton').classList.remove('active');
    //         }
    //     ))


    /**
     * Анимации в разделе section.hero
     */

    const heroBgSvg = document.getElementById('svg_bg10');

    if (heroBgSvg) {
        const heroText = document.getElementById('hero_content');
        const parallelogramsContainer = document.querySelector('.hero__img-wrapper_3');
        const textEl1 = heroText.querySelector('.el_1');
        const textEl2 = heroText.querySelector('.el_2');
        const startTime = 400;

        setTimeout(() => heroBgSvg.querySelector('.el_l3').classList.add('show'), startTime);
        setTimeout(() => heroBgSvg.querySelector('.el_l2').classList.add('show'), startTime + 300);
        setTimeout(() => heroBgSvg.querySelector('.el_l1').classList.add('show'), startTime + 700);
        setTimeout(() => heroBgSvg.querySelector('.el_10').classList.add('show'), startTime + 1100);
        setTimeout(() => heroBgSvg.querySelector('.el_gt').classList.add('show'), startTime + 1300);
        setTimeout(() => heroText.querySelector('.years').classList.add('show'), startTime + 1200);

        if (gsap) {
            gsap.registerPlugin(TextPlugin);

            setTimeout(() => gsap.to(textEl1, {duration: 1.5, text: "строим и развиваем"}), startTime + 1300);
            setTimeout(() => gsap.to(textEl2, {duration: 1, text: "вместе с Вами!"}), startTime + 2300);
        }

        setTimeout(
            () => parallelogramsContainer?.classList.remove('hide'),
            startTime + 3000
        );
    }

    /**
     * Scroll
     */

    // const scrollContainer = document.querySelector('[data-scroll-container]');
    const scrollContainer = undefined

    if (scrollContainer) {
        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true
        });
        // Обновляем скролл в случае ресайза
        new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);
        const header = document.getElementById('header');

        // Для главной страницы меняем бэкграунд хэдера после .hero секции
        if (document.getElementById('hero_content')){
            locoScroll.on('scroll', (args) => {
                if (typeof args.currentElements['hero'] === 'object') {
                    !header.classList.contains('transparent')
                        ? header.classList.add('transparent')
                        : null
                } else {
                    header.classList.remove('transparent')
                }
            });
        }

        // Якорные ссылки
        document.querySelectorAll('a[data-target-to-scroll]')
            .forEach(link => link.addEventListener('click', handlerAnchorLick))
        function handlerAnchorLick(e) {
            e.preventDefault()
            locoScroll.scrollTo(e.currentTarget.dataset.targetToScroll)
        }

        // Меняем хэдер с прозрачного на белый
        // const pageAboutHero = document.getElementById('hero_about');
        // if (pageAboutHero) {
        //     const header = document.querySelector('header');
        //
        //     locoScroll.on('scroll', (args) => {
        //         if (args.scroll.y > 0) {
        //             header.style["backgroundColor"] = 'white'
        //         } else {
        //             header.style["backgroundColor"] = 'transparent'
        //         }
        //     })
        // }
    }

    // if (document.querySelector('body[data-page="about"]')) {
    // }
    const locomotiveScroll = new LocomotiveScroll();


    const path = new URL(window.location).pathname;
    if (path === '/' || path === '') {
        window.addEventListener('scroll', () => {
            const header = document.body.querySelector('header');
            if(window.scrollY > 0) {
                header.classList.contains('transparent') ? header.classList.remove('transparent') : null;
            } else {
                header.classList.add('transparent');
            }
        })
        //*На случай перезагрузки страницы проверяем положение и если надо вешаем скукоживатель на шапку
        if (window.scrollY > 0) document.body.querySelector('header')?.classList.add('transparent');
    }


    /**
     * Карта проектов
     *
     * @type {HTMLElement}
     */
    const canvasSvg = document.getElementById("canvas_svg");
    if (canvasSvg) {
        const dataContainer = document.querySelector('.canvas__data-container');
        const regions = Array.from(canvasSvg.querySelectorAll('path[data-region-id]'));

        regions.forEach(svgPath => svgPath.addEventListener('mouseover', handlerPathMouseOver))

        function generateGetBoundingClientRect(x = 0, y = 0) {
            return () => ({
                width: 0,
                height: 0,
                top: y,
                right: x,
                bottom: y,
                left: x,
            });
        }

        const virtualElement = {
            getBoundingClientRect: generateGetBoundingClientRect(),
        };

        function handlerPathMouseOver(event) {
            const path = event.currentTarget;
            const id = path.dataset.regionId;
            const innerPopup = dataContainer.querySelector(`.canvas__inner-popup_${id}`);

            path.classList.add('highlighted');

            if (innerPopup) {
                const instance = Popper.createPopper(virtualElement, innerPopup, {
                    placement: 'right-end'
                });
                innerPopup.style.display = 'block';

                document.addEventListener('mousemove', handlerMouseMove);
                event.currentTarget.addEventListener('mouseout', handlerMouseOut, {once: true});

                function handlerMouseMove({clientX: x, clientY: y}) {
                    virtualElement.getBoundingClientRect = generateGetBoundingClientRect(x, y);
                    instance.update();
                }

                function handlerMouseOut() {
                    document.removeEventListener('mousemove', handlerMouseMove);
                    innerPopup.style.display = 'none';
                    instance.destroy();
                }
            }

            path.addEventListener(
                'mouseout',
                () => path.classList.remove('highlighted'),
                {once: true}
            );
        }
    }

    /**
     * Аккордеон
     */

    const accordion = document.getElementById('strategy_accordion');

    if (accordion) {
        const accItems = accordion.querySelectorAll('.accordion-item');

        accordion.querySelectorAll('.accordion-item__tab')
            .forEach( tab => tab.addEventListener('click', handlerAccordionTab)
        )

        function handlerAccordionTab(e) {
            const parent = e.currentTarget.parentNode;

            if (parent.classList.contains('accordion-item_active')) {
                return;
            }

            accItems.forEach(item => item.classList.remove('accordion-item_active'));

            parent.classList.toggle('accordion-item_active')

        }
    }

})
