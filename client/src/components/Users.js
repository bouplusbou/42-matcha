import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
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
    margin: '10vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
        }      
    }

   componentDidMount() {
          axios.get(`/users`)
          .then(res => {
            const users = res.data.data
            this.setState({ users })
          })
      }

    render() {
      const { classes } = this.props
      return (
        <div>
          <h2>Users</h2>
          <div className={classes.wrapper}>
              {this.state.users.slice(0, 20).map( user => 
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
