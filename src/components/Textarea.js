import React from 'react'

function Add_Highlighter(){
    document.getElementById("Content").value += `\n<Highlight language="python hjls">{\` \n  your code NOTE you can change python to language that you want \n \`}</Highlight>`
}
function Add_Markedtext(){
    document.getElementById("Content").value += `\n<h3 style={{backgroundColor:"gray",color:"black"}}> \n  your code NOTE you can change python to language that you want \n </h3>`
}
function TextArea(props) {
    return (
        <div className="Form_Content">
            <div>
                <button  type="button" title="change python to language you want" onClick={()=>{Add_Highlighter()}}> <i></i> Add code</button>
                <button type="button" onClick={()=>{Add_Markedtext()}}> <i></i> Add Marked text</button>
            </div>
            <textarea className="textarea" required id="Content" value={props.value} onChange={props.onChange} >
            </textarea>
        </div>
    )
}
export default TextArea;