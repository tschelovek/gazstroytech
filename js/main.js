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
    const heroText = document.getElementById('hero_content');
    const parallelogramsContainer = document.querySelector('.hero__img-wrapper_3');
    const textEl1 = heroText.querySelector('.el_1');
    const textEl2 = heroText.querySelector('.el_2');
    const startTime = 400;

    gsap.registerPlugin(TextPlugin);

    setTimeout(() => heroBgSvg.querySelector('.el_l3').classList.add('show'), startTime);
    setTimeout(() => heroBgSvg.querySelector('.el_l2').classList.add('show'), startTime + 300);
    setTimeout(() => heroBgSvg.querySelector('.el_l1').classList.add('show'), startTime + 700);
    setTimeout(() => heroBgSvg.querySelector('.el_10').classList.add('show'), startTime + 1100);
    setTimeout(() => heroBgSvg.querySelector('.el_gt').classList.add('show'), startTime + 1300);
    setTimeout(() => heroText.querySelector('.years').classList.add('show'), startTime + 1200);
    setTimeout(() => gsap.to(textEl1, {duration: 1.5, text: "строим и развиваем"}), startTime + 1300);
    setTimeout(() => gsap.to(textEl2, {duration: 1, text: "вместе с Вами!"}), startTime + 2300);
    setTimeout(
        () => parallelogramsContainer.classList.remove('hide'),
        startTime + 3000
    );
    /**
     * Scroll
     */
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
    // Обновляем скролл в случае ресайза
    new ResizeObserver(() => locoScroll.update()).observe(
        document.querySelector("[data-scroll-container]")
    );
    const header = document.getElementById('header');


    locoScroll.on('scroll', (args) => {
        // Get all current elements : args.currentElements
        if(typeof args.currentElements['hero'] === 'object') {
            !header.classList.contains('transparent')
                ? header.classList.add('transparent')
                : null
        } else {
            header.classList.remove('transparent')
        }
    });

    /**
     * Скукоживатель шапки при прокрутке
     */
    // window.addEventListener('scroll', () => {
    //     console.log('test')
    //     const header = document.body.querySelector('header');
    //     if(window.scrollY > 0) {
    //         !header.classList.contains('shrink') ? header.classList.add('shrink') : null;
    //         parallelogramsContainer.classList.add('hide');
    //     } else {
    //         header.classList.remove('shrink');
    //         parallelogramsContainer.classList.remove('hide')
    //     }
    // })




    /**
     * Карта проектов
     *
     * @type {HTMLElement}
     */
    const canvasSvg = document.getElementById("canvas_svg");
    if(canvasSvg) {
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

                function handlerMouseMove({ clientX: x, clientY: y }) {
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
})
