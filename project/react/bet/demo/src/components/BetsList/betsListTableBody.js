import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TableBody extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  }
  render() {
    const { columns, data } = this.props;
    return (
      <div className="bets-list--table-body">
        <table>
          <colgroup>
            {
              columns.map(obj => <col width={obj.width} key={obj.key} />)
            }
          </colgroup>
          <tbody>
            {
              data.map(obj => {
                return (
                  <tr key={obj.key}>
                    {
                      columns.map(col => <td key={col.key}>{obj[col.dataIndex]}</td>)
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableBody;
