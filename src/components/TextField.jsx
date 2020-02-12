import React from 'react';
class TextField extends React.Component {
   render() {
      return (
            <>
                { this.props.children }
                <br/>
                <textarea
                    value={this.props.test}
                    onChange={(e) => { this.props.onTestChange(e.target.value) }}
                    ref={this.props.parentRef}
                />
            </>
      );
   }
}
export default TextField;