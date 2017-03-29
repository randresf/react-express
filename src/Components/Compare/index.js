import React, { Component } from 'react'

class Compare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      similar: []
    }
  }

  componentWillMount() {
    let array = []
    Object.keys(this.props.data).map((elem) => (
      array.push(this.props.data[elem])
    ))
     this.getCommonData(array[0], array[1])
  }
  getCommonData(arr1, arr2){
    let similar = []
    arr1.forEach((item) =>{
      let aux = arr2.find((obj)=>{
    		return obj.id === item.id
    	})
      if(aux !== undefined) similar.push(aux)
    })
    this.setState({
      similar: similar
    })
  }

  render() {
    return (
      <div className="Compare">
        <h1>{this.props.title}</h1>
        {
          this.state.similar.map((elm) => {
            return(
              <div className="container" data-id={elm.id}>
                <h4><b>{elm.name}</b></h4>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Compare
