import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { columns } = this.props;
    return (
      <table className="bets-list--table-header">
        <colgroup>
          {
            columns.map(obj => <col width={obj.width} key={obj.key} />)
          }
        </colgroup>
        <thead>
          <tr>
            {
              columns.map((obj) => {
                return <th key={obj.key}>{obj.title}</th>
              })
            }
          </tr>
        </thead>
      </table>
    )
  }
}

export default TableHeader;
