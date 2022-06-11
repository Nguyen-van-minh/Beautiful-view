import React from "react";

const Chart = () => {

    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div>
                        <iframe style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: "100%",
                            height: "350px"
                        }}
                            src="https://charts.mongodb.com/charts-project-0-itdqj/embed/charts?id=6296383b-7033-4da4-8c33-163290096aeb&maxDataAge=3600&theme=light&autoRefresh=true">
                        </iframe>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div>
                        <iframe style={{
                            background: "#FFFFFF",
                            border: 'none',
                            borderRadius: 2,
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: "100%",
                            height: "350px"
                        }}

                            src="https://charts.mongodb.com/charts-project-0-itdqj/embed/charts?id=6296349b-7033-4059-8598-163290055469&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart