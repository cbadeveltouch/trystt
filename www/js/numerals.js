initKeypadNumerals = () => {
    let val = document.getElementById('numerals')

    resize = () => {
        let length = document.getElementsByClassName('numeral').length

        if ( length > 3 ) {
            /* val.css('font-size', (1 - (length / 10)) + 'em') */
            val.style['font-size'] = (1 - (length / 10)) + 'em'
            
            if ( length < 5) {
                $('.numeral:nth-child(2)').html($('.numeral:nth-child(2)').html().substring(0, 1));
            } else if (length == 5) {
                $('.numeral:nth-child(2)').html($('.numeral:nth-child(2)').html().substring(0, 1));
                $('.numeral:nth-child(2)').append(',');
                $('.numeral:nth-child(3)').html($('.numeral:nth-child(3)').html().substring(0, 1));
            } else if (length == 6) {
                $('.numeral:nth-child(2)').html($('.numeral:nth-child(2)').html().substring(0, 1));
                $('.numeral:nth-child(3)').html($('.numeral:nth-child(3)').html().substring(0, 1));
                $('.numeral:nth-child(3)').append(',');
            }
        } else if (length == 0) {
            /* val.append('<span class="numeral">0</span>'); */
            let node = document.createElement('span')
            node.classList.add('numeral')
            node.innerHTML = '0'
            val.appendChild(node)
                        
            /* $('.numeral').last().addClass('displayed'); */
            let allNumeral = document.getElementsByClassName('numeral')
            allNumeral[allNumeral.length -1].classList.add('displayed')
        } else {
            /* val.css('font-size', '1em'); */
            val.style['font-size'] = '1em'
        }
    }

    reflow = () => {
        //adding reflow to allow the DOM to process the removeClass before calling the addClass, which insures that the css key-frame animation fires. This is an adaptation of a vaniall JS trick from Chris Coyier https://css-tricks.com/restart-css-animation
        /* $('#numerals').width($('#numerals').width()); */
        let numeralsEl = document.getElementById('numerals'),
            numeralsElWidth = numeralsEl.offsetWidth
        numeralsEl.offsetWidth = 0
        numeralsEl.offsetWidth = numeralsElWidth
    }

    jiggle = () => {
        /* $('#numerals').removeClass('jiggle');
        reflow();
        $('#numerals').addClass('jiggle'); */
        let numeralsEl = document.getElementById('numerals')
        numeralsEl.classList.remove('jiggle')
        reflow()
        numeralsEl.classList.add('jiggle')
    }

    [].forEach.call( document.getElementsByClassName('buttons-kp-key'), btn => {

        btn.onclick = () => {
            /* var content = $(this).find('span').html(); */
            let content = document.getElementById('keypad-cmp').getElementsByTagName('span')[0].innerHTML
            //???????? TODO: capire se funziona bene

            decimal = () => {
                /* if ($('.numeral').last().hasClass('decimals')) { */
                let numeralsElements = [],
                    lastNumeralsElement = {},
                    lastNumeralsElement_hasCls_decimals = false

                numeralsElements = document.getElementsByClassName('numeral')
                lastNumeralsElement = numeralsElements[numeralsElements.length -1]
                lastNumeralsElement_hasCls_decimals = lastNumeralsElement.classList.contains('decimals')

                if (lastNumeralsElement_hasCls_decimals) {
                    jiggle()
                } else {
                    //
                    /* val.append('<span class="numeral decimals"><span class="decimal">0</span><span class="decimal">0</span></span>'); */
                    let node1 = document.createElement('span')
                    node1.classList.add('numeral')
                    node1.classList.add('decimals')
                    val.appendChild(node1)

                    let node2 = document.createElement('span')
                    node2.classList.add('decimal')
                    node2.innerHTML = '0'
                    node1.appendChild(node2)

                    let node3 = document.createElement('span')
                    node3.classList.add('decimal')
                    node3.innerHTML = '0'
                    node1.appendChild(node3)
                    
                    reflow()

                    /* $('.numeral').last().addClass('displayed'); */
                    numeralsElements = document.getElementsByClassName('numeral')
                    lastNumeralsElement = numeralsElements[numeralsElements.length -1]
                    lastNumeralsElement.classList.add('displayed')
                }
            }

            add = () => {
                /* val.append('<span class="numeral">' + content + '</span>'); */
                let node = document.createElement('span')
                node.classList.add('numeral')
                node.innerHTML = content
                val.appendChild(node)
                /* node.appendChild(content) */

                reflow()
                /* $('.numeral').last().addClass('displayed'); */
                let numeralsElements = document.getElementsByClassName('numeral'),
                    lastNumeralsElement = numeralsElements[numeralsElements.length -1]
                lastNumeralsElement.classList.add('displayed')
            }

            decimalAdd = () => {
                /* if ($('.decplayed').length == 0) { */
                if (document.getElementsByClassName('decplayed').length == 0) {
                    /* $('.decimal').first().addClass('smallhide'); */
                    let firstDecimalCmp = document.getElementsByClassName('decimal')[0]
                    firstDecimalCmp.classList.add('smallhide')

                    setTimeout( () => {
                        /* $('.smallhide').hide(); */
                        [].forEach.call( document.getElementsByClassName('smallhide'), sh => sh.style.display = 'none' );
                        /* $('.decimals').prepend('<span class="decplayed">' + content + '</span>'); */
                        [].forEach.call( document.getElementsByClassName('decimals'), dec => {
                            let node = document.createElement('span')
                            node.classList.add('decplayed')
                            /* node.appendChild(content) */
                            node.innerHTML = content
                            dec.insertBefore(node, dec.childNodes[0])
                        });
                        /* document.getElementsByClassName('decimals').forEach( dec => {
                            let node = document.createElement('span')
                            node.classList.add('decplayed')
                            node.innerHTML = content
                            dec.insertBefore(node, dec.childNodes[0])
                        }) */
                        //?????????????? TODO: dubbio su prepend
                        
                        reflow()

                        /* $('.decplayed').first().addClass('smalldisplayed'); */
                        let firstDecplayed = document.getElementsByClassName('decplayed')[0]
                        firstDecplayed.classList.add('smalldisplayed')

                    }, 100)
                /* } else if ($('.decplayed').length == 1) { */
                } else if (document.getElementsByClassName('decplayed').length == 1) {
                    /* $('.decimal').last().addClass('smallhide'); */
                    let decimalCmps = document.getElementsByClassName('decimal'),
                        lastDecimalCmps = decimalCmps[decimalCmps.length -1]
                    lastDecimalCmps.classList.add('smallhide')

                    setTimeout( () => {
                        /* $('.smallhide').hide(); */
                        [].forEach.call( document.getElementsByClassName('smallhide'), sh => sh.style.display = 'none' );
                        /* $('.decimals').append('<span class="decplayed">' + content + '</span>'); */
                        [].forEach.call( document.getElementsByClassName('decimals'), dccmps => {
                            let node = document.createElement('span')
                            node.classList.add('decplayed')
                            node.innerHTML = content
                            dccmps.appendChild(node)
                        });

                        reflow()

                        /* $('.decplayed').last().addClass('smalldisplayed'); */
                        let decimalPlayed = document.getElementsByClassName('decplayed'),
                            lastDecimalPlayed = decimalPlayed[decimalPlayed.length -1]
                        lastDecimalPlayed.classList.add('smalldisplayed')

                    }, 100)
                } else {
                    jiggle()
                }
            }

            let numeralsElements = document.getElementsByClassName('numeral'),
                numeralLength = numeralsElements.length,
                lastNumeralsElement = numeralsElements[numeralsElements.length -1],
                lastNumeralsElement_hasCls_decimals = lastNumeralsElement.classList.contains('decimals')

            if (numeralLength < 6) {
                if ((numeralLength == 1) && (content == '0' || content == '.')) {
                    jiggle()
                } else if ((numeralLength == 1) && (content !== '0' || content !== '.')) {
                    /* $('#numerals').find('span').addClass('hide'); */
                    [].forEach.call( document.getElementById('numerals').getElementsByTagName('span'), numspn => numspn.style.display = 'none' );
                    /* document.getElementById('numerals').getElementsByTagName('span').forEach( numspn => numspn.style.display = 'none') */

                    setTimeout( () => {
                        /* $('.hide').hide(); */
                        [].forEach.call( document.getElementsByClassName('hide'), hideEl => hideEl.style.display = 'none' );
                        /* document.getElementsByClassName('hide').forEach( hideEl => hideEl.style.display = 'none') */
                        add()
                    }, 150)
                } else if (content == '.') {
                    decimal()
                } else if (lastNumeralsElement_hasCls_decimals) {
                    decimalAdd()
                } else {
                    add()
                    resize()
                }
            } else if (numeralLength == 6 && content == '.') {
                decimal()
            } else if ((numeralLength == 7 || numeralLength == 6) && lastNumeralsElement_hasCls_decimals) {
                decimalAdd()
            } else if (numeralLength == 0) {
                /* val.append('<span class="numeral">0</span>'); */
                let node = document.createElement('span')
                node.classList.add('numeral')
                node.innerHTML = '0'
                val.appendChild(node)
                /* $('.numeral').last().addClass('displayed'); */
                lastNumeralsElement.classList.add('displayed')
            } else {
                jiggle()
            }
        }

    })

    /* $('.key').click(function(){
         //corpo funzione spostato
    }); */

/*     $('#back').click(function(){
    if($('.numeral').length == 1){
    jiggle();
    } else if ($('.numeral').length == 2) {
    $('.numeral').last().removeClass('displayed');
    setTimeout(
    function() 
    {
    $('.numeral').last().remove();
    $('.numeral').first().show().removeClass('hide');
    }, 150);
    } else if($('.numeral').last().hasClass('decimals')){
    if($('.decplayed').length == 0){
    $('.numeral').last().removeClass('displayed');
    setTimeout(
    function() 
    {
    $('.numeral').last().remove();
    resize();
    }, 150);
    }
    if($('.decplayed').length == 1){
    $('.decplayed').removeClass('smalldisplayed');
    setTimeout(
    function() 
    {
    $('.decplayed').first().remove();
    $('.decimal').first().show().removeClass('smallhide');
    }, 100);
    } else if($('.decplayed').length == 2){
    $('.decplayed').last().removeClass('smalldisplayed');
    setTimeout(
    function() 
    {
    $('.decplayed').last().remove();
    $('.decimal').last().show().removeClass('smallhide');
    }, 100);
    }
    } else {
    $('.numeral').last().removeClass('displayed');
    setTimeout(
    function() 
    {
    $('.numeral').last().remove();
    resize();
    }, 150);
    }

    }); */

    resize()
};