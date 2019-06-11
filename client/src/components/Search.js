import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';


const styles = theme => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '0.4fr 1.6fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: ". .",
  },
  slider: {
    width: 200,
  },
  leftPanel: {
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
  tag: {
    fontSize: '0.8em',
    fontWeight: '400',
  },
  wrapper: {
    margin: '3vw 5vw 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Search extends Component {
  state = {
    users: [],
    age: [18, 100],
    fame: [0, 1000],
    latlng: [48.856697, 2.351462],
    tags: [],
    authToken: localStorage.getItem('token')
  };

  componentDidMount() {
    axios.get(`/users?authToken=${this.state.authToken}`)
      .then(res => {
        this.setState({ users: res.data.data });
      });
    axios.post(`/tags`)
      .then(res => {
        this.setState({ tags: res.data.data });
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
