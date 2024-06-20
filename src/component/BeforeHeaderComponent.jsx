import React from "react";
 export default class BeforeHeader extends React.Component {

    componentDidMount(){
        this.animation()
    }

    animation(){
        var  elem= document.getElementById("move")
        var pos= 0
        setInterval(frame,8)

        function frame(){
            if(pos === document.body.clientWidth){
                pos = -10
            }else{
                pos++
                elem.style.left = pos + "px"
            }
        }
    }
    render(){
        const {username,utoken} = this.props
        return (
            <div className="topNavBar col-12 d-none d-lg-block text-center">
                <p id="move">{utoken ? `Bienvenue à Ty-shop ${username} 😊` : "Profitez du meilleur site e-commerce au Maroc"}</p>
            </div>
        )
    }
 }