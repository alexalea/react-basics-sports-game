
class Team extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
          score: 0,
          shots: 0
        }

        this.shotSound = new Audio('./assets/audio/Bounces.mp3')
        this.scoreSound = new Audio('./assets/audio/Back+Board.mp3')
    }


    shotHandler = () => {
        
        let score = this.state.score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 80)
        }

        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }


    render(){
        let shotPercentageDiv

        if (this.state.shots) {
        const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %: {shotPercentage}</strong>
            </div>
         )
        }

        return (
            <div className="Team">
                <h2>{this.props.name}</h2>

                <div className="identity">
                    <img src={this.props.logo} alt={this.props.name} />
                </div>

                <div>
                    <strong>Shots:</strong> {this.state.shots}
                </div>

                <div>
                    <strong>Score:</strong> {this.state.score}
                </div>

                {shotPercentageDiv}

                <button onClick={this.shotHandler}>Shoot!</button>
            </div>
        )
    }   
}

function Game(props) {
    return (
        <div className="Game">
            <h1>Welcome to {props.venue}</h1>
            <div className="stats">
            <Team 
            name={props.visitingTeam.name} 
            logo={props.visitingTeam.logoSrc} 
            />

            <div className="versus">
                <h1>VS</h1>
            </div>

            <Team 
            name={props.homeTeam.name} 
            logo={props.homeTeam.logoSrc}
            />
            </div>
        </div>
    )
}


function App (props) {
    const irish = {
        name: "Fighting Irish",
        logoSrc: "./assets/image/FightingIrish.jpg"
    }

    const monopoly = {
        name: "Thailand Tobacco Monopoly",
        logoSrc: "./assets/image/TobaccoMonopoly.jpg"
    }

    const nerds = {
        name: "Neverland Nerds",
        logoSrc: "./assets/image/nerd.jpg"
    }

    const jocks = {
        name: "Jamestown Jocks",
        logoSrc: "./assets/image/jock.jpg"
    }

    return (
      <div className="App">
          <Game 
          venue="Thunder Dome" 
          homeTeam={irish}
          visitingTeam={monopoly}
          />
          <Game venue="The Pits" 
          homeTeam={jocks}
          visitingTeam={nerds}
          />
      </div>
    )
  }


ReactDOM.render(
    <App />,
    document.getElementById('root')
  )