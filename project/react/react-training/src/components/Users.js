import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import 'moment/locale/zh-tw';
import Moment from 'react-moment';
import {
  Container,
  Table,
  Button,
  Header,
  Segment,
  Form,
  Input,
  Dimmer,
  Loader,
  Pagination,
  Modal,
  Confirm,
  Icon,
  Dropdown,
  Popup,
} from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { useForm } from 'react-hook-form';
import {
  fetchList,
  addUser,
  updateUser,
  deleteUser,
} from '../api/Users';
import { deepClone } from '../utils';
import { scrollToBottom } from '../utils/scroll-to';

const defaultFormData = {
  username: '',
  enable: 1,
  locked: 0,
};
const defaultDateRange = {
  date: '',
  time: '',
  dateTime: '',
  datesRange: '',
};

/**
 * preserve the max data total
 * @param {Number} total
 */
const useMaxTotal = (total) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current || total > ref.current) {
      ref.current = total;
    }
  }, [total]);
  return ref.current;
};

/**
 * @param {object} pagination
 */
const convertPageData = (pagination) => {
  const { max_results: maxResults, first_result: firstResult, total } = pagination;

  const totalPages = Math.ceil(total / Number(maxResults));
  const activePage = Math.floor(Number(firstResult) + Number(maxResults)) / Number(maxResults);

  return {
    totalPages,
    activePage,
    total,
    beginIndex: firstResult,
    pageDataLength: maxResults,
  };
};

/**
 * @param {object} range
 */
const convertDateParams = (range) => {
  const rangeAry = range.split(' - ');

  return {
    startDate: new Date(`${rangeAry[0]} 00:00:00`),
    endDate: new Date(`${rangeAry[1]} 23:59:59`),
  };
};

/**
 * fetch list data hook
 * @param {object} initParams
 * @param {Array} initData initialize user list data
 */
export const useDataApi = (initParams, initData) => {
  const [data, setData] = useState(initData);
  const [params, setParams] = useState(initParams);
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({
    totalPages: 0,
    activePage: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchList(params);

      setData(result.ret);
      setPageData(convertPageData(result.pagination));
      setIsLoading(false);
    };
    fetchData();
  }, [params]);

  return [{
    data, isLoading, pageData, params,
  }, setParams, setData];
};

const usePopupState = (initPopupState) => {
  const [popupState, setPopupState] = useState(initPopupState);
  return [{ popupState }, setPopupState];
};

/**
 * @param {boolean} initValue
 */
const useHighlightNewRow = (initValue) => {
  const [isHighlightNewRow, setIsHighlightNewRow] = useState(initValue);
  useEffect(() => {
    if (isHighlightNewRow) {
      scrollToBottom();
      setTimeout(() => {
        setIsHighlightNewRow(false);
      }, 5000);
    }
  }, [isHighlightNewRow]);

  return [{ isHighlightNewRow }, setIsHighlightNewRow];
};

/**
 * modal form reducer hooks
 * @param {object} state
 * @param {object} action
 */
export const modalFormReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATE_ITEM':
      return {
        ...state,
        [action.key]: action.fieldValue,
      };
    case 'APPLY_STATE':
      return {
        ...action.newState,
      };
    default:
      throw Error('unknown action');
  }
};

/**
 * make DatesRangeInput value
 * @param {string} type range type
 */
const getTypeDateValue = (type) => {
  const getWeek = (isLast) => {
    const mainWeek = isLast ? moment().week(moment().week() - 1) : moment();

    return {
      beginDate: mainWeek.startOf('week').subtract(-1, 'days').format('YYYY-MM-DD'),
      endDate: mainWeek.endOf('week').subtract(-1, 'days').format('YYYY-MM-DD'),
    };
  };
  const getMonth = (isLast) => {
    const mainMonth = isLast ? moment().month(moment().month() - 1) : moment();

    return {
      beginDate: mainMonth.startOf('month').format('YYYY-MM-DD'),
      endDate: mainMonth.endOf('month').format('YYYY-MM-DD'),
    };
  };

  const typeRange = {
    thisWeek: getWeek(false),
    lastWeek: getWeek(true),
    thisMonth: getMonth(false),
    lastMonth: getMonth(true),
  };

  return typeRange[type];
};

const useFormHook = () => {
  const [formState, dispatch] = useReducer(modalFormReducer, { ...defaultFormData });
  const {
    register, errors, setValue, handleSubmit, reset,
  } = useForm();
  useEffect(() => {
    register({ name: 'username' }, { required: true });
  }, [register]);

  return [formState, dispatch, errors, setValue, handleSubmit, reset];
};

function Users() {
  const { t, i18n } = useTranslation(['common', 'users']);
  const [{
    data, isLoading, pageData, params,
  }, doParams, doData] = useDataApi({}, []);
  const maxDataTotal = useMaxTotal(Number(pageData.total));
  const [filterUserName, setFilterUserName] = useState('');
  const [filterEnable, setFilterEnable] = useState('');
  const [filterLocked, setFilterLocked] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ ...defaultDateRange });
  const [{ isHighlightNewRow }, setIsHighlightNewRow] = useHighlightNewRow(false);
  const [formState, dispatch, errors, setValue, handleSubmit, reset] = useFormHook();

  const [{ popupState }, setPopupState] = usePopupState(false);
  const [modalSetting, setModalSetting] = useState({
    setOpen: false,
    type: 'add',
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    deleteUserData: { ...defaultFormData },
    open: false,
  });

  const enableSelectOptions = useMemo(() => [
    { key: 'e', text: t('users:enable'), value: 1 },
    { key: 'd', text: t('users:disable'), value: 0 },
  ], [t]);
  const lockedSelectOptions = useMemo(() => [
    { key: 'l', text: t('users:locked'), value: 1 },
    { key: 'u', text: t('users:unlock'), value: 0 },
  ], [t]);

  const handleDateRangeChange = useCallback((event, { name, value }) => {
    setFilterDateRange({ [name]: value });
  }, []);

  const putDateRange = useCallback((type) => {
    const rangeValueData = getTypeDateValue(type);
    setFilterDateRange({ datesRange: `${rangeValueData.beginDate} - ${rangeValueData.endDate}` });
  }, []);

  const paginationParams = useMemo(() => ({
    total: Number(pageData.total),
    beginIndex: Number(pageData.beginIndex),
    pageDataLength: Number(pageData.pageDataLength),
  }), [pageData]);

  const handlePaginationChange = useCallback((activePage) => {
    paginationParams.beginIndex = (activePage - 1) * paginationParams.pageDataLength;

    const searchParams = {
      ...params,
      first_result: paginationParams.beginIndex,
      max_results: paginationParams.pageDataLength,
    };

    setFilterUserName(searchParams.username || '');

    setFilterEnable(searchParams.enable || '');

    setFilterLocked(searchParams.locked || '');

    if (searchParams.start_created_at && searchParams.end_created_at) {
      const datesRangeValue = `${moment(searchParams.start_created_at).format('YYYY-MM-DD')} - ${moment(searchParams.end_created_at).format('YYYY-MM-DD')}`;
      setFilterDateRange({ datesRange: datesRangeValue });
    } else {
      setFilterDateRange({ ...defaultDateRange });
    }

    doParams(searchParams);
  }, [params, doParams, paginationParams]);

  const restFilterParams = useCallback(() => {
    setFilterUserName('');
    setFilterEnable('');
    setFilterLocked('');
    setFilterDateRange({ ...defaultDateRange });
  }, []);

  const handleRestParams = useCallback(() => {
    restFilterParams();

    doParams({});
  }, [doParams, restFilterParams]);

  const toHighlightNewRow = useCallback(() => {
    const { pageDataLength } = paginationParams;
    let { beginIndex } = paginationParams;
    beginIndex = Math.floor(maxDataTotal / pageDataLength) * pageDataLength;

    setIsHighlightNewRow(true);
    restFilterParams();
    doParams({
      first_result: beginIndex,
      max_results: pageDataLength,
    });
  }, [paginationParams, maxDataTotal, setIsHighlightNewRow, restFilterParams, doParams]);

  const handleSearch = useCallback(() => {
    paginationParams.beginIndex = 0;
    let searchParams = {
      first_result: paginationParams.beginIndex,
      max_results: paginationParams.pageDataLength,
    };


    if (filterUserName !== '') {
      searchParams = {
        ...searchParams,
        username: filterUserName,
      };
    }

    if (filterEnable !== '') {
      searchParams = {
        ...searchParams,
        enable: filterEnable,
      };
    }

    if (filterLocked !== '') {
      searchParams = {
        ...searchParams,
        locked: filterLocked,
      };
    }

    if (filterDateRange.datesRange !== '') {
      // Incorrect value
      if (filterDateRange.datesRange.split(' - ')[1] === '') {
        setFilterDateRange({ ...defaultDateRange });
      } else {
        const { startDate, endDate } = convertDateParams(filterDateRange.datesRange);
        searchParams = {
          ...searchParams,
          start_created_at: startDate,
          end_created_at: endDate,
        };
      }
    }

    doParams(searchParams);
  }, [paginationParams, filterUserName, filterEnable, filterLocked, filterDateRange, doParams]);

  const handleAddUser = useCallback(() => {
    dispatch({ type: 'APPLY_STATE', newState: defaultFormData });
    setModalSetting({
      setOpen: true,
      type: 'add',
    });
  }, [dispatch]);

  /**
   * @param {object} thisUser the current user data
   */
  const handleEditUser = useCallback((thisUser) => {
    dispatch({ type: 'APPLY_STATE', newState: deepClone(thisUser) });
    setValue('username', thisUser.username);
    setModalSetting({
      setOpen: true,
      type: 'edit',
    });
  }, [setValue, dispatch]);

  const handleCloseModal = useCallback(() => {
    setModalSetting({
      ...modalSetting,
      setOpen: false,
    });
    reset();
  }, [modalSetting, reset]);

  const handleDelete = useCallback(async () => {
    const { deleteUserData } = deleteConfirm;

    await deleteUser(deleteUserData.id);
    const responseMessage = `${t('users:msgDeleteUser')} "${deleteUserData.username}"`;
    toast({
      type: 'success',
      title: t('success'),
      description: responseMessage,
      time: 3000,
    });

    setDeleteConfirm({ ...deleteConfirm, open: false });

    // if this is the last row of table, than back to last page
    if (data.length === 1) {
      handlePaginationChange(pageData.totalPages - 1);
    } else {
      doData(data.filter((item) => item.id !== deleteUserData.id));
    }
  }, [deleteConfirm, handlePaginationChange, pageData, doData, data, t]);

  const handleModalConfirm = useCallback(async () => {
    let responseData = {};
    if (modalSetting.type === 'add') {
      const { ret } = await addUser(formState);
      responseData = ret;

      toHighlightNewRow();
    } else {
      const { ret } = await updateUser(formState.id, formState);
      responseData = ret;
      const dataList = [...data];

      for (let index = 0; index < dataList.length; index += 1) {
        if (dataList[index].id === responseData.id) {
          dataList.splice(index, 1, { ...responseData });
          break;
        }
      }
      doData(dataList);
    }
    const responseMessage = `${modalSetting.type === 'add' ? t('users:msgAddUser') : t('users:msgEditUser')} "${responseData.username}"`;
    toast({
      type: 'success',
      title: t('success'),
      description: responseMessage,
      time: 3000,
    });
    setModalSetting({
      ...modalSetting,
      setOpen: false,
    });
    reset();
  }, [modalSetting, toHighlightNewRow, formState, data, doData, reset, t]);

  const tableHeaderData = useMemo(() => [
    { label: t('tb_id'), key: 'id' },
    { label: t('tb_created'), key: 'created_at' },
    { label: t('users:locked'), key: 'locked' },
    { label: t('users:enable'), key: 'enable' },
    { label: t('tb_name'), key: 'username' },
  ], [t]);

  const tableBodyData = useMemo(() => data.map((item) => (
    {
      ...item,
      created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
      enable: item.enable ? t('users:enable') : t('users:disable'),
      locked: item.locked ? t('users:locked') : t('users:unlock'),
      username: (`=""${item.username}""`), // Preserve leading zero in csv file
    }
  )), [data, t]);

  const TableHeader = useCallback(() => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1}>{t('tb_SN')}</Table.HeaderCell>
        <Table.HeaderCell width={1}>{t('tb_id')}</Table.HeaderCell>
        <Table.HeaderCell width={4}>{t('tb_created')}</Table.HeaderCell>
        <Table.HeaderCell width={4}>{t('tb_name')}</Table.HeaderCell>
        <Table.HeaderCell width={1}>{t('users:enable')}</Table.HeaderCell>
        <Table.HeaderCell width={1}>{t('users:locked')}</Table.HeaderCell>
        <Table.HeaderCell width={6}>{t('tb_function')}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  ), [t]);

  const tableRowData = useMemo(() => data.map((item, index) => (
    <Table.Row key={item.id} positive={index === data.length - 1 && isHighlightNewRow} data-testid={`tableRow_${item.id}`}>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>
        <Moment format="YYYY-MM-DD HH:mm:ss">
          {item.created_at}
        </Moment>
      </Table.Cell>
      <Table.Cell>{item.username}</Table.Cell>
      <Table.Cell negative={!item.enable}>{item.enable ? t('users:enable') : t('users:disable')}</Table.Cell>
      <Table.Cell negative={!!item.locked}>{item.locked ? t('users:locked') : t('users:unlock')}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => { handleEditUser(item); }}>
          <Icon name="edit" />
          {t('edit')}
        </Button>
        <Button color="red" onClick={() => { setDeleteConfirm({ deleteUserData: item, open: true }); }}>
          <Icon name="trash" />
          {t('delete')}
        </Button>
      </Table.Cell>
    </Table.Row>
  )), [data, isHighlightNewRow, handleEditUser, t]);

  const TableRowNoResultsComponent = useCallback(() => (
    <Table.Row>
      <Table.Cell colSpan="7" textAlign="center">No results found.</Table.Cell>
    </Table.Row>
  ), []);

  const PaginationComponent = useCallback(() => (
    <Pagination
      boundaryRange={0}
      activePage={pageData.activePage}
      onPageChange={(e, { activePage }) => handlePaginationChange(activePage)}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={2}
      totalPages={pageData.totalPages}
    />
  ), [pageData, handlePaginationChange]);

  return (
    <div>
      <Container>
        <Header as="h2" textAlign="left">{t('users:usersPanel')}</Header>
        <Segment
          clearing
          textAlign="right"
          style={{
            border: 0, boxShadow: 'none', paddingLeft: 0, paddingRight: 0,
          }}
        >
          <Button color="green" floated="left" onClick={handleAddUser}>
            <Icon name="plus" />
            {t('users:addUser')}
          </Button>

          <Input
            placeholder={t('users:userName')}
            value={filterUserName}
            style={{ width: '150px', marginRight: '10px' }}
            onChange={(event) => setFilterUserName(event.target.value)}
          />
          <div style={{ display: 'inline-flex', width: '100px', marginRight: '10px' }}>
            <Dropdown
              selection
              options={enableSelectOptions}
              value={filterEnable}
              onChange={(e, { value }) => { setFilterEnable(value); }}
              clearable
              fluid
              placeholder={t('users:enable')}
            />
          </div>
          <div style={{ display: 'inline-flex', width: '100px', marginRight: '10px' }}>
            <Dropdown
              selection
              options={lockedSelectOptions}
              value={filterLocked}
              onChange={(e, { value }) => { setFilterLocked(value); }}
              clearable
              fluid
              placeholder={t('users:locked')}
            />
          </div>
          <div style={{ display: 'inline-flex', marginRight: '10px' }}>
            <Popup
              flowing
              open={popupState}
              onClose={() => setPopupState(false)}
              onOpen={() => setPopupState(true)}
              position="top left"
              hideOnScroll
              hoverable
              on="focus"
              trigger={(
                <div
                  onBlur={() => setPopupState(false)}
                  onFocus={() => setPopupState(true)}
                >
                  <DatesRangeInput
                    style={{ width: '220px' }}
                    name="datesRange"
                    placeholder={t('fromTo')}
                    animation="fade"
                    iconPosition="left"
                    dateFormat="YYYY-MM-DD"
                    value={filterDateRange.datesRange}
                    onChange={handleDateRangeChange}
                    allowSameEndDate
                    closeOnMouseLeave={false}
                    localization={i18n.language}
                  />
                </div>
              )}
            >
              <Button.Group>
                <Button color="blue" onMouseDown={() => { putDateRange('thisWeek'); }}>{t('thisWeek')}</Button>
                <Button color="blue" onMouseDown={() => { putDateRange('lastWeek'); }}>{t('lastWeek')}</Button>
                <Button color="teal" onMouseDown={() => { putDateRange('thisMonth'); }}>{t('thisMonth')}</Button>
                <Button color="teal" onMouseDown={() => { putDateRange('lastMonth'); }}>{t('lastMonth')}</Button>
              </Button.Group>
            </Popup>
          </div>
          <Button primary style={{ marginLeft: '10px' }} onClick={handleSearch}>
            <Icon name="search" />
            {t('search')}
          </Button>
          <Button onClick={handleRestParams}>
            <Icon name="redo" />
            {t('reset')}
          </Button>
          <CSVLink data={tableBodyData} headers={tableHeaderData} filename={`${t('users:usersPanel')}.csv`}>
            <Button style={{ marginRight: 0 }}>
              <Icon name="download" />
              {t('export')}
            </Button>
          </CSVLink>
        </Segment>
        <Segment vertical>
          <Dimmer active={isLoading} inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
          <Table celled data-testid="table">
            <TableHeader />
            <Table.Body>
              {data.length > 0 ? tableRowData : <TableRowNoResultsComponent />}
            </Table.Body>
          </Table>
          {data.length > 0 ? <PaginationComponent /> : <div />}

        </Segment>
      </Container>

      <Modal open={modalSetting.setOpen} dimmer="inverted" data-testid="modal">
        <Modal.Header>{modalSetting.type === 'add' ? t('users:addUser') : t('users:editUser')}</Modal.Header>
        <Modal.Content>
          <Container>
            <Form>
              <Form.Field
                width="4"
                error={!!errors.username}
                required
              >
                <label>{t('users:userName')}</label>
                <Input
                  placeholder={t('users:userName')}
                  value={formState.username}
                  name="username"
                  onChange={async (e, { name, value }) => {
                    dispatch({ type: 'UPDATE_STATE_ITEM', key: 'username', fieldValue: value });
                    setValue(name, value, true);
                  }}
                />
              </Form.Field>
              <Form.Select
                label={t('users:enable')}
                width="4"
                options={enableSelectOptions}
                value={formState.enable}
                onChange={(e, { value }) => { dispatch({ type: 'UPDATE_STATE_ITEM', key: 'enable', fieldValue: value }); }}
              />
              <Form.Select
                label={t('users:locked')}
                width="4"
                options={lockedSelectOptions}
                value={formState.locked}
                onChange={(e, { value }) => { dispatch({ type: 'UPDATE_STATE_ITEM', key: 'locked', fieldValue: value }); }}
              />
            </Form>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            content={modalSetting.type === 'add' ? t('add') : t('update')}
            onClick={handleSubmit(handleModalConfirm)}
          />
          <Button onClick={handleCloseModal}>{t('cancel')}</Button>
        </Modal.Actions>
      </Modal>
      <Confirm
        open={deleteConfirm.open}
        content={`${t('users:msgDeleteUser')} "${deleteConfirm.deleteUserData.username}"`}
        onCancel={() => { setDeleteConfirm({ ...deleteConfirm, open: false }); }}
        onConfirm={handleDelete}
        data-testid="popConfirm"
        cancelButton={t('cancel')}
        confirmButton={t('ok')}
      />
    </div>
  );
}

export default Users;
