import React from 'react'


var teamDetails = [
  {name: "Richard Neill",
    email: "richard.neil@unipart.io",
    imgURL: "img/team/Richard_Neill.jpg",
    title: "Chief Digital Officer at Unipart Logistics",
    description: "Responsible for the digital team; we solve problems and have a strong focus on open-source software",
    divider: ""
  },
  {name: "Piotr Gryko",
    email: "piotr.gryko@unipart.io",
    imgURL: "img/team/Piotr_Gryko.jpg",
    title: "Software engineer at Unipart Logistics",
    description: "Responsible for the Digital Comm Cell",
    divider: ""
  },
  {name: "Calantha Coulton",
    email: "Calantha.Coulton@unipart.io",
    imgURL: "img/team/Calantha_Coulton.jpg",
    title: "Developer at Unipart Logistics",
    description: "Digital Comm Cell development",
    divider: ""
  },
  {name: "Steve Marvell",
    email: "Steve.Marvell@unipart.io",
    imgURL: "img/team/Steve_Marvell.jpg",
    title: "Systems Architect at Unipart Logistics",
    description: "Responsible for hardware and infrastructure",
    divider: ""
  },
  {name: "Nataliia Bobrova",
    email: "nataliia.bobrova@unipart.io",
    imgURL: "img/team/Nataliia_Bobrova.jpg",
    title: "Graphic designer at Unipart Logistics",
    description: "Responsible for the design of the digital Comm Cell",
    divider: ""
  }
];

export default React.createClass({

  Teammate: function(person,index) {
    

    return (
      <div key={person.name}>
        <div className="col-lg-3 col-sm-6">
          <div className="teammate-1 text-center">
            <div className="thumbnail">
              <div className="flipper">
                <div className="front">
                  <img src={person.imgURL} alt={person.name}/>
                </div>
                <div className="back">
                  <p className="padding-top">{person.description}</p>
                  <div className="social-bar">
                    <a href={person.email} className="sb-skype" data-toggle="tooltip" title="Skype">
                      <i className="fa sb-email"></i>
                    </a>
                    <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#" className="sb-twitter" data-toggle="tooltip" title="Twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="teammate-name">{person.name}</h3>
            <p>{person.title}</p>
          </div>
        </div>
      </div>
    );

  },

  render() {
    return (
      <div>
        {/*<!-- Team Type 1 --> */}
        <section className="container padding-bottom-3x">
          <h2 className="block-title text-center">
            Smart people. Brilliant ideas.
            <small>Who's behind all this?</small>
          </h2>
          <div className="row padding-top">
            {/*<!-- Teammate -->*/}
            {teamDetails.map(this.Teammate) }

            {/*<!-- Teammate -->*/}

          </div>
          {/*<!-- .row --> */}
          {/*<!-- Quotation -->*/}
          <h3 className="text-muted text-center space-bottom">Team Philosophy</h3>
          <div className="row space-bottom-2x">
            <div className="col-md-10 col-md-offset-1">
              <blockquote>
                <p>He who works with his hands is a laborer.
                  He who works with his hands and his head is a craftsman.
                  He who works with his hands and his head and his heart is an artist.</p>
                <cite>Louis Nizer</cite>
              </blockquote>
              {/*<!-- block quote -->*/}
            </div>
            {/*<!-- .col-md-10.col-md-offset-1 -->*/}
          </div>
          {/*<!-- .row -->*/}
          <p>Its that last part that is hard to bridge for a lot of engineers.
            The thing that did it for me was sitting through a LOT of formal usability studies.
            Seeing folks actually use an application you made, where they make mistakes, get stuck,
            will change your relationship with your code. Even if you work purely on the back end building APIs,
            you have customers (other developers in this case).
            Focus on the what the code does, and why someone would use it,
            care about your customer... the how only matters to your fellow engineer,
            and if it is that bad they are going to give you grief for it and you can fix it.</p>
        </section>
        {/*<!-- .container --> */}
      </div>

    )
  }
})

