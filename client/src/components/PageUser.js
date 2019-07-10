import React, {Component} from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Modal from '@material-ui/core/Modal';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const styles = theme => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 0.8fr 2.2fr 0.5fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '. . . .',
    backgroundColor: '#F9F6FF',
  },
  margin: {
  },
  photoColumn: {
    margin: '3vw  0',
  },
  username: {
    margin: '0',
    fontWeigth: '900',
    fontSize: '3rem',
    color: '#3F3F3F',
  },
  bioTitle: {
    margin: '7vw 0 0 0 ',
    fontWeigth: '900',
    fontSize: '2rem',
    color: '#3F3F3F',
  },
  photo: {
    height: '25vw',
    width: '20vw',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 13,
  },
  infoColumn: {
    position: 'relative',
    padding: '0 6vw',
    margin: '3vw  0',

  },
  basicInfos: {
    color: '#B0B0B0',
  },
  fame: {
    color: '#B0B0B0',
  },
  likeButton: {
    position: 'absolute',
    right: '10px',
    margin: '3vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '7vw',
    width: '7vw',
    borderRadius: '100%',
    backgroundColor: '#FFFFFF',
    // filter: 'drop-shadow(0 0.7rem 0.6rem lightgrey)',
  },
  insideModal: {
    outline: 'none',
    margin: '15vw',
  },
});

class PageUser extends Component {
  state = {
    id_user: this.props.match.params.id,
    user: [],
    openModal: false,
    authToken: localStorage.getItem('token'),
  };

  componentDidMount() {
    const { id_user, authToken } = this.state;
    axios.get(`/users/${id_user}?authToken=${authToken}`)
      .then(res => {
        const user = res.data.data[0];
        this.setState({ user });
      });
  }

  handleClickPhoto = () => {
    this.setState({ openModal: true });
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  render() {
    const { classes } = this.props;
    let { user, openModal } = this.state;
    return (
      <div>
        <div className={classes.main}>
          <Modal
            open={openModal}
            onClose={this.handleCloseModal}
          >
            <div className={classes.insideModal}>
              <Carousel
                  arrowLeft={<FontAwesomeIcon style={{cursor: 'pointer', fontSize: '3vw', margin: '0 3vw', color: '#F5F5F5'}} icon={faArrowAltCircleLeft} />}
                  arrowRight={<FontAwesomeIcon style={{cursor: 'pointer', fontSize: '3vw', margin: '0 3vw', color: '#F5F5F5'}} icon={faArrowAltCircleRight} />}
                  addArrowClickHandler
              >
                <img style={{height: '30vw', borderRadius: 13}} src={user.image_1} alt="user profile 1" />
                <img style={{height: '30vw', borderRadius: 13}} src={user.image_1} alt="user profile 2" />
                <img style={{height: '30vw', borderRadius: 13}} src={user.image_1} alt="user profile 3" />
              </Carousel>
            </div>
          </Modal>
          <div className={classes.margin}></div>
          <div className={classes.photoColumn}>
            <div  
              className={classes.photo} 
              style ={ { backgroundImage: `url(${user.image_1})`, cursor: 'pointer' } }
              onClick={this.handleClickPhoto} 
            >
            </div>
            <dir className={classes.basicInfos} >
              <p style={{textTransform: 'capitalize'}}><FontAwesomeIcon style={{color: '#FB8585', margin: '0 8px'}} icon={faMapMarkerAlt} /> {user.city}</p>
              <p><FontAwesomeIcon style={{color: '#FB8585', margin: '0 8px'}} icon={faBirthdayCake} /> {user.age} ans</p>
            </dir>
          </div>
          <div className={classes.infoColumn}>
            <div className={classes.likeButton}>
              <FontAwesomeIcon style={{color: '#CBCBCB', fontSize: '3.5vw', margin: '0.7vw 0 0 0'}} icon={faHeart} />
            </div>
            <p className={classes.username}>{user.username} <FontAwesomeIcon style={{color: '#A6E05C', fontSize: '1vw', margin: '0 0 0 8px'}} icon={faCircle} /></p>
            <p className={classes.fame}>Fame score: {user.fame}</p>
            <p className={classes.bioTitle}>Bio</p>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PageUser);
