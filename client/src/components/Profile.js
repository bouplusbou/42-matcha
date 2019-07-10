import React, {Component} from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import UploadImage from './Upload';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  main: {
    margin: '0 15vw'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1.2fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '. . .',
    alignItems: 'end',
    margin: '0 12vw'
  },
  rowName: {
    color: '#82818B',
    fontSize: '1.5em',
    fontWeigth: '900',
  },
  rowValue: {
    color: '#494653',
    fontSize: '1em',
    fontWeigth: '700',
  },
  rowEdit: {
    color: '#6DBDFA',
    fontSize: '0.9em',
    fontWeigth: '900',
    cursor: 'pointer',
    justifySelf: 'end',
  },
  divider: {
    margin: '2vw 12vw',
    backgroundColor: 'lightgrey',
    height: '0.5px',
  },
  photo: {
    height: '25vw',
    width: '20vw',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 13,
    backgroundColor: '#4024D4',
    margin: '2vw auto',
  },
  photoContainer: {
    margin: '5vw auto',
  },
  photoEdit: {
    color: '#6DBDFA',
    fontSize: '0.9em',
    fontWeigth: '900',
    cursor: 'pointer',
    margin: '2vw',
    textAlign: 'center',
  },
  insideModal: {
    backgroundColor: 'white',
    borderRadius: 13,
    height: '15vw',
    width: '25vw',
    padding: '10vw',
    outline: 'none',
    margin: '15vw auto',
  },
})

class ProfilePage extends Component {
  state = {
    user: [],
    openModal: false,
    authToken: localStorage.getItem('token'),
  };

  async componentDidMount() {
      const { authToken } = this.state;
      const user = await axios.get(`/users/profile?authToken=${authToken}`);
      console.log(user);
      this.setState({ user: {username: user.data.data[0].username} });
  }

  handleClickUpload = () => {
    this.setState({ openModal: true });
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  render() {
    const { classes } = this.props;
    const { user, openModal } = this.state;
    return (
      <div>
        <div className={classes.main} >
          <Modal
            open={openModal}
            onClose={this.handleCloseModal}
          >
            <div className={classes.insideModal}>
              <UploadImage />
            </div>
          </Modal>
          <h1>Profile</h1>
          <div className={classes.photoContainer}>
            <div  
              className={classes.photo} 
              style ={ { backgroundImage: `url(${user.image_1})`, cursor: 'pointer' } }
            >
            </div>

            <div className={classes.photoEdit}>chose your profile picture</div>
            <div 
              className={classes.photoEdit}
              onClick={this.handleClickUpload}
            >
              upload more photos
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowName}>Username</div>
            <div className={classes.rowValue}>{user.username}</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Password</div>
            <div className={classes.rowValue}>******</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Last name</div>
            <div className={classes.rowValue}>{user.last_name}</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>First name</div>
            <div className={classes.rowValue}>{user.first_name}</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Age</div>
            <div className={classes.rowValue}>{user.age} ans</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Email</div>
            <div className={classes.rowValue}>{user.email}</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Ville</div>
            <div className={classes.rowValue}>Paris</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Orientation</div>
            <div className={classes.rowValue}>Bi</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Genre</div>
            <div className={classes.rowValue}>Non binaire</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Bio</div>
            <div className={classes.rowValue}>
              Singer-songwriter Freddie Mercury was born Farrokh Bulsara on September 5, 1946, in Zanzibar, Tanzania. He studied piano in boarding school in India and befriended numerous musicians at London's Ealing College of Art. The music of Mercury's band, Queen, reached the top of U.S. and British charts. Mercury died of AIDS-related bronchial pneumonia on November 24, 1991, at age 45.
            </div>
            <div className={classes.rowEdit}>edit</div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.row}>
            <div className={classes.rowName}>Interests</div>
            <div className={classes.rowValue}>#aquabiking #artnouveau</div>
            <div className={classes.rowEdit}>edit</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfilePage);
