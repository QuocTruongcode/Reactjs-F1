import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyBooking.scss';
import { postVerifyBookAppointment } from "../../services/userService";

class VerifyBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false
    };
  }

  async componentDidMount() {

    const queryParams = new URLSearchParams(this.props.location.search);

    const token = queryParams.get("token");
    const doctorId = queryParams.get("doctorId");

    if (token && doctorId) {

      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId
      });

      console.log("verify result:", res);

      if (res && res.data.errCode === 0) {
        this.setState({
          statusVerify: true
        });
      }
    }
  }

  render() {

    return (
      <Fragment>
        <HomeHeader />

        <div className={this.state.statusVerify ? "container_success" : "container_fail"}>
          {this.state.statusVerify === true ?
            <>
              <i className="fas fa-check-circle"></i>
              <p>Xác nhận đặt lịch thành công!!!</p>
            </>
            :
            <>
              <i className="fas fa-exclamation-triangle"></i>
              <p>Không hợp lệ hoặc link đã kích hoạt</p>
            </>

          }
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(VerifyBooking);