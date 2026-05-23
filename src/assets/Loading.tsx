export const Loading = ()=>{
    return(
        <div style={{width : "80%" , height : "100vh",display : "flex", alignItems : "center", 
                margin : "auto",justifyContent : "center"  }}>

            <div id="bar" style={{ width : '20rem' , height : "2rem", 
                borderRadius : "30px", border:"2px solid rgba(126, 61, 188, 0.851)" 
            } }>
                <div id="ball" style={{width : "2rem" , height : "2rem", 
                    borderRadius : "50%", backgroundColor:"rgb(128, 195, 173)"
                }}></div>
                <div id="ball1" style={{width : "2rem" , height : "2rem", 
                    borderRadius : "50%", backgroundColor:"rgb(245, 146, 111)"
                }}></div>
                <div id="ball2" style={{width : "2rem" , height : "2rem", 
                    borderRadius : "50%", backgroundColor:"rgb(222, 190, 149)"
                }}></div>
            </div>
        </div>
    );
}