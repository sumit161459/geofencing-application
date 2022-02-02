import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    
    super(props);
    // let that=this;
    this.state = {
      center: {
        lat: null,
        lng: null,
      },
      current:{
        lat:null,
        lng:null
      },
      distance:10,
      content: 'Getting position...',
      insideFence: false,
      previousPolygon: null,
      fence: null,
      watchID: null,
      lastFetched: null,
      savedLocation:false,
      inside:true
    };
  }


  componentDidMount() {
    this.watchLocation();
  }

  componentWillUnmount() {
    this.unwatchLocation();
  }

  watchLocation() {
    if ('geolocation' in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge : 30000,
        timeout : 27000
      };

      navigator.geolocation.watchPosition(this.getLocation.bind(this), null, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  
  updateCenter(position){
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
    alert('center updated successfully')
  }

  currentLocation() {
    if ('geolocation' in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge : 30000,
        timeout : 27000
      };
      navigator.geolocation.getCurrentPosition(this.updateCenter.bind(this), null, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }



  unwatchLocation() {
    if ('geolocation' in navigator && this.state.watchID) {
      navigator.geolocation.clearWatch(this.state.watchID);
    }
  }

  getLocation(position) {
    this.setState({
      current: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
    if(this.state.center.lat===null){
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    }
    this.checkDistance();
  }

    checkDistance(){
    let x=this.getDistanceFromLatLonInKm(this.state.center.lat,this.state.center.lng,this.state.current.lat,this.state.current.lng);
    if(x<10){
      this.setState({
        inside:true
      })
    }
    else{
      this.setState({
        inside:false
      })
    }
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    if(!lat1 || !lat2 || !lon1 || !lon2) return 0;
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    let x=d;
    return x*1000;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  saveLocation(){
    alert('Location saved succesfully')
  }
  
  chnageFence(e){
    console.log(e.target.value);
    this.setState({
      distance:e.target.value
    })
  }

  render() {

    
    return (
      <>
      {this.state.center.lat===null && <h2>Enter your location to use the app</h2>}
      {this.props.isLoggedIn && this.state.center.lat!==null &&
      <div >
        <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Latitude  {this.state.current.lat}</h2></div>
        <div style={{display:'flex',justifyContent:'center'}}><h2>Longitude  {this.state.current.lng}</h2></div>
        <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Fencing(in meter)  {this.state.distance}</h2></div>
        <div style={{display:'flex',justifyContent:'center'}}><h2>Longitude  {this.state.current.lng}</h2></div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <button style={{background:'green',height:'30px',width:'150px'}}  onClick={this.currentLocation.bind(this)}>Change Center</button>
        <button style={{background:'grey',height:'30px',width:'150px',marginLeft:'5px'}}  onClick={this.saveLocation.bind(this)}>Save Location</button>
        </div>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}> <b>Enter fencing radius</b>&nbsp;<input type="number" onChange={this.chnageFence.bind(this)}></input></div>
        {this.state.inside && <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>You are inside the fence</h2></div>}
        {!this.state.inside && <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Alert!! You are outside the fence</h2></div>}
        
      </div>}
      {
        !this.props.isLoggedIn && this.state.center.lat!==null &&
        
        <div >
          <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Signin to use geofencing application</h2></div>
        <div style={{display:'flex',justifyContent:'center',height:'30px'}}><h2>Latitude  {this.state.current.lat}</h2></div>
        <div style={{display:'flex',justifyContent:'center'}}><h2>Longitude  {this.state.current.lng}</h2></div>
        </div>
      }
      </>
    )
  }
}

export default Home;