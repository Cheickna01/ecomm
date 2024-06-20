import React from "react"
function Title({name,title}){
        return (
            <div className="row">
                <div className="col-10 mx-auto text-center my-4 text-title">
                    <h1 className="font-weight-bold font-capitalize">
                        {name} <strong className="text-yellow">{title}</strong>
                    </h1>
                </div>
            </div>
        )
}

export default Title;