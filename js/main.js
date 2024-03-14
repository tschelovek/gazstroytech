document.addEventListener('DOMContentLoaded', () => {

    /**
     *
     */

    const heroBgSvg = document.getElementById('svg_bg10');
    const heroText = document.getElementById('hero_content');
    const textEl1 = heroText.querySelector('.el_1');
    const textEl2 = heroText.querySelector('.el_2');

    gsap.registerPlugin(TextPlugin);

    setTimeout(() => heroBgSvg.querySelector('.el_l3').classList.add('show'), 200);
    setTimeout(() => heroBgSvg.querySelector('.el_l2').classList.add('show'), 500);
    setTimeout(() => heroBgSvg.querySelector('.el_l1').classList.add('show'), 900);
    setTimeout(() => heroBgSvg.querySelector('.el_10').classList.add('show'), 1300);
    setTimeout(() => heroBgSvg.querySelector('.el_gt').classList.add('show'), 1500);
    setTimeout(() => heroText.querySelector('.years').classList.add('show'), 1400);
    setTimeout(() => gsap.to(textEl1, {duration: 1.5, text: "строим и развиваем"}), 1500);
    setTimeout(() => gsap.to(textEl2, {duration: 1, text: "вместе с Вами!"}), 2500);




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
