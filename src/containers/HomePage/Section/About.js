import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';

class About extends Component {

    render() {
        return (
            <div className='section-about'>
                <div className='section-about-hearder'>
                    <p>Trận đấu kinh gần nhất của dissneland</p>
                </div>
                <div className='section-about-body'>
                    <div className='section-about-body-left'>
                        <iframe width="700" height="350" src="https://www.youtube.com/embed/ceyGZllsDCQ" title="DISSNEELAND XI - GODTHIC vs LINH THỘN - BATTLE RAP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='section-about-body-right'>
                        <p><i>"Không còn cố giữ bản tính mơ màng, không còn là kẻ hay thích thở than <br />
                            Loạng choạng con đường duyên nghiệp dở dang, tâm hồn hạn hẹp dần tự biết mở mang<br />
                            Không biết tương lai bao điều chờ đợi, không biết đã bỏ lại bao nhiêu cơ hội<br />
                            Không biết cần phải làm sao để gỡ rối, đôi chân vẫn lặng thầm lao về ngõ tối<br />
                            Áp lực đồng tiền vẫn hàng ngày nhức nhối<br />
                            Trước kia luôn vui vẻ, thì bây giờ hay tức tối<br />
                            Chẳng cất lời than vãn vì cuộc sống luôn hối hả<br />
                            Gạt phiền muộn trôi qua cùng làn mưa tuôi xối xả<br />
                            Vẫn chưa thể tự vứt bỏ sự bồng bột lại đây<br />
                            Vẫn ôm lấy những tâm tư không một ai hay<br />
                            Giấu trong những khoảng tối tăm không chốn giãi bày<br />
                            Vẫn cố hết sức để sống tốt mai này................."<br /></i>
                            <p className='author'>Hưng Cao - Q.L.C</p>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
