import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        font-family: sans-serif;
        
    }

    body {
        height: 100%;
        background: linear-gradient(to bottom, #414141 0%, #181818 100%), #181818;
        background-size:100% 250px, 100%;
        background-repeat:no-repeat;
        background-position:top;

        text-rendering: optimizeLegibility !important;
        -webkit-font-smothing: anti-aliased;

    }

    .unlogged{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;

        a{
            background: #2ebd59;
            font-size:24px;
            text-decoration:none !important;
            border-radius: 500px;
            letter-spacing: 2px;
            font-weight: 700;
            width:100%;
            max-width:500px;
            padding: 10px;
            text-align: center;
            margin: 10px 10px 0 0px;
            color: #fff;
            border: 0;
            cursor: pointer;
        
        }
        

    }


    
        
`;

export default GlobalStyle;
