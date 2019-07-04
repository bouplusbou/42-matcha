import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardMedia from '@material-ui/core/CardMedia';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  h1: {
    color: '#FFB0BD',
    margin: '0 0 1em 0',
  },
  main: {
    backgroundColor: '#FFF9FA',
    padding: '0 10vw',
    display: 'grid',
    gridTemplateColumns: '0.5fr 1.5fr',
    gridTemplateRows: '0.2fr 1.8fr',
    gridTemplateAreas: '". ." ". ."',
    gridAutoFlow: 'row',
  },
  leftPanel: {
    margin: '3vw 0 0 3vw',
    padding: '3em',
    width: 200,
    height: '60vh',
    backgroundColor: 'white',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gridColumn: '1',
    gridRow: '1 / 3',
  },
  card: {
    position: 'relative',
    width: 250,
    height: 375,
    margin: 20,
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: '20px',
    backgroundColor: 'white',
  },
  cityFame: {
    color: '#4A4A4A',
    fontFamily: 'Roboto',
    fontWeight: '500',
    textTransform: 'capitalize',
    fontSize: '0.8em',
  },
  username: {
    fontSize: '1.5em',
    margin: '0',
    color: '#4A4A4A',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  media: {
    height: 300,
  },
  sort: {
    margin: '3vw 0 0 3vw',
    gridColumn: '2',
    gridRow: '1',
    fontFamily: 'Roboto',
    textAlign: 'end',
  },
  tags: {
    display: 'flex',
    scrollbarWidth: 'none',
    // overflow: 'scroll',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tag: {
    backgroundColor: '#FFD8D8',
    color: '#FF7070',
    borderRadius: '10px',
    padding: '5px',
    margin: '3px 5px 0 0',
    // fontSize: '0.8em',
    // fontWeight: '400',
  },
  cardHover: {
    backgroundColor: 'white',
    margin: '0 auto',
    height: '100px',
    width: '80%',
    borderRadius: '15px',
    padding: '1em',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    top: '20px',
  },
  wrapper: {
    margin: '3vw 5vw 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gridColumn: '2',
    gridRow: '2',
  },
});

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class PageSearch extends Component {
  state = {
    users: [],
    age: [18, 100],
    fame: [0, 1000],
    latlng: [48.856697, 2.351462],
    tags: [],
    authToken: localStorage.getItem('token')
  };

  componentDidMount() {
    const { authToken } = this.state;
    axios.get(`/users?authToken=${authToken}`)
      .then(res => {
        this.setState({ users: res.data.data });
      });
    axios.post(`/tags?authToken=${authToken}`)
      .then(res => {
        this.setState({ tags: res.data.data });
        console.log(res.data.data);
      });
  }

  handleAgeChange = async (value) => {
    await this.setState({ age: value })
    const { age, fame, latlng, authToken } = this.state;
    const search = {
      age: age,
      fame: fame,
      latlng: latlng,
    };
    axios.post(`/users/search?authToken=${authToken}`, search)
      .then(res => {
        this.setState({ users: res.data.data });
      });
  }

  handleFameChange = async (value) => {
    await this.setState({ fame: value })
    const { age, fame, latlng, authToken } = this.state;
    const search = {
      age: age,
      fame: fame,
      latlng: latlng,
    };
    axios.post(`/users/search?authToken=${authToken}`, search)
      .then(res => {
        this.setState({ users: res.data.data });
      });
  }

  handleLatlngChange = async ({suggestion}) => {
    await this.setState({ latlng: [suggestion.latlng.lat, suggestion.latlng.lng] })
    const { age, fame, latlng, authToken } = this.state;
    const search = {
      age: age,
      fame: fame,
      latlng: latlng,
    };
    axios.post(`/users/search?authToken=${authToken}`, search)
      .then(res => {
        this.setState({ users: res.data.data });
      });
  }

  handleSelectChange = async (tags) => {
    let tagIds = [];
    await tags.forEach( tag => {
      tagIds.push(tag.value)
    });
    const { age, fame, latlng, authToken } = this.state;
    const search = {
      age: age,
      fame: fame,
      latlng: latlng,
      tags: tagIds
    };
    axios.post(`/users/search?authToken=${authToken}`, search)
      .then(res => {
        this.setState({ users: res.data.data });
      });
  }


  render() {
    const { classes } = this.props;
    const { users, age, fame, tags } = this.state;
    return (
      <div>
        <Header />
        <div className={classes.main}>
          <div className={classes.leftPanel}>
            <h1 className={classes.h1}>Filter</h1>
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
            <AlgoliaPlaces
              placeholder='Search a city here'
              options={{
                appId: 'plGGWNJECAIH',
                apiKey: 'ecb0baaa5b936ebb8dcc52e94b0b3b75',
                language: 'fr',
                countries: ['fr'],
                type: 'city',
              }}
              onChange={this.handleLatlngChange}
            />
            <p>Distance</p>
            <p>Interests</p>
            <Select
              onChange={this.handleSelectChange}
              defaultValue={[tags[1]]}
              isMulti
              name="colors"
              options={tags}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className={classes.sort}>
            <p><span style={{color: '#CBCBCB', marginRight: '5px'}}>Sort by:</span> Youngest <FontAwesomeIcon style={{color: '#FB8585', margin: '0 8px'}} icon={faChevronDown}/></p>
          </div>
          <div className={classes.wrapper}>
            {users.slice(0, 50).map( user => 
              <div key={user.id_user} className={classes.card} style={{backgroundImage: `url(${user.image_1})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
                <div className={classes.cardHover}>
                  <p className={classes.username}>{user.username}</p>
                  <p className={classes.cityFame}><FontAwesomeIcon style={{marginRight: '8px'}} icon={faMapMarkerAlt}/>{user.city} <FontAwesomeIcon style={{margin: '0 8px 0 15px'}} icon={faFireAlt}/>{user.fame}</p>
                  <div className={classes.tags}>
                    {user.tags.map( (tag, index) =>
                      <p key={index} className={classes.tag}>#{tag}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PageSearch);


{/* <div className={classes.wrapper}>
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
          {user.tags.map( (tag, index) =>
              <p key={index} className={classes.tag}>#{tag}</p>
          )}
          {user.username}, {user.age} 
          <br/> {user.city}
        </div>
      </Link>
    </CardActionArea>
  </Card>
)}
</div> */}