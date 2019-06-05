import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Button from '@material-ui/core/Button'


const styles = theme => ({
  main: {
    // backgroundColor: 'red',
    display: 'grid',
    gridTemplateColumns: '0.4fr 1.6fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: ". .",
  },
  slider: {
    width: 200,
  },
  leftPanel: {
    // backgroundColor: 'blue',
    margin: '3vw 0 0 3vw',
    padding: '1em',
    width: 300,
    height: 300,
  },
  card: {
    position: 'relative',
    width: 200,
    height: 300,
    margin: 20,
    display: 'flex',
    alignItems: 'flex-end'
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: '1.3em',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  media: {
    height: 300,
  },
  wrapper: {
    // backgroundColor: 'green',
    margin: '3vw 5vw 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


class Users extends Component {
    state = {
      users: [],
      age: [18, 100],
      fame: [0, 1000],
      search: [18, 100],
    }

   componentDidMount() {
          axios.get(`/users`)
          .then(res => {
            this.setState({ users: res.data.data })
          })
    }

    handleAgeChange = async (value) => {
      await this.setState({ age: value })
      const { age, fame } = this.state
      const search = {
        age: age,
        fame: fame,
      }
      axios.post(`/search`, search)
        .then(res => {
          this.setState({ users: res.data.data })
        })
    }

    handleFameChange = async (value) => {
      await this.setState({ fame: value })
      const { age, fame } = this.state
      const search = {
        age: age,
        fame: fame,
      }
      axios.post(`/search`, search)
        .then(res => {
          this.setState({ users: res.data.data })
        })
    }



    render() {
      const { classes } = this.props
      const { users, age, fame } = this.state
      return (
        <div className={classes.main}>
          <div className={classes.leftPanel}>
            <h1>Search</h1>
            <p>Age</p>
            <Range 
              onAfterChange={this.handleAgeChange}
              min={18}
              max={40}
              allowCross={false}
              defaultValue={age}
              tipFormatter={value => `${value}`} 
            />
            <p>Fame</p>
            <Range 
              onAfterChange={this.handleFameChange}
              min={0}
              max={1000}
              allowCross={false}
              defaultValue={fame}
              tipFormatter={value => `${value}`} 
            />
            <p>City</p>
            <p>Interests</p>
          </div>
          <div className={classes.wrapper}>
              {users.slice(0, 50).map( user => 
                <Card key={user.id_user} className={classes.card}>
                  <CardActionArea>
                    <Link to={`/users/${user.id_user}`}>
                      <CardMedia
                        className={classes.media}
                        image={user.image_1}
                        title="Profile picture"
                      />
                      <div className={classes.overlay}>
                         {user.username}, {user.age}
                      </div>
                    </Link>
                  </CardActionArea>
                </Card>
              )}
          </div>
        </div>
      )
      // return (
      //   <div>
      //     <h2>Users</h2>
      //     <div className={classes.wrapper}>
      //         {this.state.users.map( user => 
              
      //             <div className={classes.card} style={{ backgroundImage: `url('${user.image_1}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      //               {/* <Link className={classes.link} to={`/users/${user.id_user}`}>{ user.username }</Link> */}
      //               <h4 className={classes.text} >{user.username}, {user.age}</h4>
      //             </div>
      //         )}
      //     </div>
      //   </div>
      // )
    }
}

export default withStyles(styles)(Users)
