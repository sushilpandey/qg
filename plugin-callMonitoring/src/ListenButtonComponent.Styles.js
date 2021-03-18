import styled from 'react-emotion';

export const ListenCallButtonStyle = styled('div')`
.listenDiv {
    border: 1px solid #d2d2d2;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: block;
    margin: 40px auto;
    cursor: pointer;
    background-image: linear-gradient(to top,#D9DCE4,#D9DCE4);
    outline: 0;
}
.listenDiv:hover {
	background-color: rgba(0,0,0,0.2);
    background-blend-mode: color;
    outline: 0
}
.endDiv.listenDiv {
	background-image: linear-gradient(to top,#1976D2,#1976D2);
}    
.listenDiv svg {
	vertical-align: middle;
   	width: 20px;
    height: 20px;
}
.endDiv svg {
	  color: #fff;
}
`