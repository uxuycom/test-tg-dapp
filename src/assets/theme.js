// @ts-nocheck
const themeConfg = {
    colors: {
        // AlphaGreen: 'var(--AlphaGreen)',

        // 基础色
        Neutral_0: 'var(--Neutral_0)',
        Neutral_1: 'var(--Neutral_1)',
        Neutral_2: 'var(--Neutral_2)',
        Neutral_3: 'var(--Neutral_3)',
        Neutral_4: 'var(--Neutral_4)',
        Neutral_5: 'var(--Neutral_5)',
        Neutral_6: 'var(--Neutral_6)',
        Neutral_7: 'var(--Neutral_7)',
        Neutral_8: 'var(--Neutral_8)',
        Neutral_9: 'var(--Neutral_9)',
        Neutral_10: 'var(--Neutral_10)',
        DarkNeutral_0: 'var(--DarkNeutral_0)',
        DarkNeutral_1: 'var(--DarkNeutral_1)',
        DarkNeutral_2: 'var(--DarkNeutral_2)',
        DarkNeutral_3: 'var(--DarkNeutral_3)',
        DarkNeutral_4: 'var(--DarkNeutral_4)',
        DarkNeutral_5: 'var(--DarkNeutral_5)',
        DarkNeutral_6: 'var(--DarkNeutral_6)',
        DarkNeutral_7: 'var(--DarkNeutral_7)',
        DarkNeutral_8: 'var(--DarkNeutral_8)',
        DarkNeutral_9: 'var(--DarkNeutral_9)',
        DarkNeutral_10: 'var(--DarkNeutral_10)',
        Purple: 'var(--Purple)',
        Blue: 'var(--Blue)',
        Green: 'var(--Green)',
        Red: 'var(--Red)',
        RedOrange: 'var(--RedOrange)',
        Orange: 'var(--Orange)',
        Yellow: 'var(--Yellow)',
        White: 'var(--White)',
        Black: 'var(--Black)',
        DarkPurple: 'var(--DarkPurple)',
        DarkBlue: 'var(--DarkBlue)',
        DarkGreen: 'var(--DarkGreen)',
        DarkRed: 'var(--DarkRed)',
        DarkRedOrange: 'var(--DarkRedOrange)',
        DarkOrange: 'var(--DarkOrange)',
        DarkYellow: 'var(--DarkYellow)',
        DarkWhite: 'var(--DarkWhite)',
        DarkBlack: 'var(--DarkBlack)',
        AlphaPurple: 'var(--AlphaPurple)',
        AlphaBlue: 'var(--AlphaBlue)',
        AlphaGreen: 'var(--AlphaGreen)',
        AlphaRed: 'var(--AlphaRed)',
        AlphaRedOrange: 'var(--AlphaRedOrange)',
        AlphaOrange: 'var(--AlphaOrange)',
        AlphaYellow: 'var(--AlphaYellow)',
        AlphaBlack: 'var(--AlphaBlack)',
        DarkAlphaPurple: 'var(--DarkAlphaPurple)',
        DarkAlphaBlue: 'var(--DarkAlphaBlue)',
        DarkAlphaGreen: 'var(--DarkAlphaGreen)',
        DarkAlphaRed: 'var(--DarkAlphaRed)',
        DarkAlphaRedOrange: 'var(--DarkAlphaRedOrange)',
        DarkAlphaOrange: 'var(--DarkAlphaOrange)',
        DarkAlphaYellow: 'var(--DarkAlphaYellow)',
        DarkAlphaBlack: 'var(--DarkAlphaBlack)',

        // 主题色
        text_1: 'var(--color_text_1)',
        text_2: 'var(--color_text_2)',
        text_3: 'var(--color_text_3)',
        text_brand: 'var(--color_text_brand)',
        text_link: 'var(--color_text_link)',
        text_buy: 'var(--color_text_buy)',
        text_sell: 'var(--color_text_sell)',
        text_danger: 'var(--color_text_danger)',
        bg_0: 'var(--color_bg_0)',
        bg_1: 'var(--color_bg_1)',
        bg_2: 'var(--color_bg_2)',
        bg_4: 'var(--color_bg_4)',
        bg_6: 'var(--color_bg_6)',
        bg_bottom: 'var(--color_bg_bottom)',
        bg_top: 'var(--color_bg_top)',
        border_1: 'var(--color_border_1)',
        border_2: 'var(--color_border_2)',
        border_success: 'var(--color_border_success)',
        border_fail: 'var(--color_border_fail)',
        border_warning: 'var(--color_border_warning)',
        border_link: 'var(--color_border_link)',
        button_primary: 'var(--color_button_primary)',
        button_subtle: 'var(--color_button_subtle)',
        button_disable: 'var(--color_button_disable)',
        button_brand: 'var(--color_button_brand)',
        button_buy: 'var(--color_button_buy)',
        button_sell: 'var(--color_button_sell)',
        button_danger: 'var(--color_button_danger)',
        brand_1: 'var(--color_brand_1)',
        brand_2: 'var(--color_brand_2)',
        icon_close_bg: 'var(--color_icon_close_bg)',
        overlay_bg: 'var(--overlay_bg)',
        overlay_mnemonic: 'var(--overlay_mnemonic)',
    },
   
   
    
    tgColors:{
    
       dark: {
         bg_0: '#212121',
         bg_bottom: '#0f0f0f',
         mainButton:{
            disabledBgColor: '#6F3E15',
            disabledTextColor: '#6F6F6F',
            textColor:"#ffffff",
            bgColor:"#ff7400",
 
         }
       },
       light: {
         bg_0: '#ffffff',
         bg_bottom: '#efeff4',
         mainButton:{
            disabledBgColor: '#FFCEA6',
            disabledTextColor: '#ffffff',
            textColor:"#ffffff",
            bgColor:"#ff7400"
 
         }
       }
    }

}

// CommonJS export
if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = themeConfg
}

// ES6 export
// @ts-ignore
if (typeof define === 'function' && define.amd) {
    define([], function () {
        return themeConfg
    })
}

// ES6 named export
if (typeof exports === 'object' && typeof module !== 'undefined') {
    exports.default = themeConfg
}

export default themeConfg
