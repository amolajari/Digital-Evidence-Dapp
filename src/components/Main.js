import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              
              <h2>Add Evidence</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.evdDescription.value
                const id = this.evdId.value
                this.props.uploadImage(description)
              }}>
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="evdId"
                        type="text"
                        ref={(input) => { this.evdId = input }}
                        className="form-control"
                        placeholder="Evidence ID..."
                        required />
                  </div>

                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="evdDescription"
                        type="text"
                        ref={(input) => { this.evdDescription = input }}
                        className="form-control"
                        placeholder="Evidence description..."
                        required />
                  </div>

                   
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                <p>&nbsp;</p>
                <button type="submit" class="btn btn-dark btn-block btn-lg">Upload</button>
              </form>

              <p>&nbsp;</p>
                
                {/* Code ... */}

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;