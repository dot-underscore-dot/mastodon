import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  doSqueak() {
    dispatch({ type: 'NOOP', meta: { sound: 'squeak' } });
  },
});

// const buttonStyle = { border:0, cursor:'inherit', backgroundColor:'transparent' };
export default @connect(null, mapDispatchToProps)
class Mascot extends React.PureComponent {

  static propTypes = {
    mascot: PropTypes.string,
    className: PropTypes.string,
    outerClassName: PropTypes.string,
    doSqueak:PropTypes.func,
  };

  render() {
    const { mascot, className, outerClassName, doSqueak } = this.props;

    return <div onClick={doSqueak}  className={outerClassName} ><img className={className} alt='Mascot' draggable='false' src={mascot} /></div>;
  }

}