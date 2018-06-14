import React, { PureComponent } from 'react';
import {Popover, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import {logout} from '../../services/index'
import Cookies from 'universal-cookie';
import { setLogin} from "../../actions/Common";

const Item = Popover.Item;
const cookies = new Cookies();

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false

    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  render() {
    return (<NavBar
      mode="light"
      onLeftClick={() => console.log('onLeftClick')}

      rightContent={
        <Popover mask
                 overlayClassName="fortest"
                 overlayStyle={{ color: 'currentColor' }}
                 visible={this.state.visible}
                 overlay={[
                   (<Item value="1"><Icon style={{verticalAlign: 'middle',marginRight:'5px',display:'inline-block'}}  type="cross-circle" />退出登录</Item>),
                 ]}
                 align={{
                   overflow: { adjustY: 0, adjustX: 0 },
                   offset: [-10, 0],
                 }}
                 onVisibleChange={this.handleVisibleChange}
                 onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      }
    >

      冲天炮</NavBar>);
  }
  onSelect = (opt) => {

    if(opt.props.value === '1'){
      this.submitLogout()
    }
  };

  submitLogout = () => {
    logout({}).then(res => {
      if(res){
        this.props.setLogin(false)
        cookies.remove('uname')
      }
    }).catch(res => {
      console.log(res)
    })
  }
}

const mapDispatchToProps = {
  setLogin,
}

const mapStateToProps = ({Common}) => ({
  isLogin: Common.isLogin
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);

