import React, {
  useMemo, useCallback, useEffect, useState,
} from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Container,
  Dropdown,
  Icon,
  Segment,
} from 'semantic-ui-react';

import './Header.scss';

const useLanguageHook = (defaultLang) => {
  const [lang, setLang] = useState(defaultLang);
  const { t, i18n } = useTranslation('header');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const languageOptions = useMemo(() => [
    { key: 'en', text: t('languageOption.en'), value: 'en' },
    { key: 'zhTw', text: t('languageOption.zhTw'), value: 'zh_TW' },
  ], [t]);

  return [lang, t, languageOptions, setLang];
};
function HeaderComponent() {
  const [lang, t, languageOptions, setLang] = useLanguageHook(Cookies.get('language'));


  const handleLangChange = useCallback((event, { value }) => {
    setLang(value);
    Cookies.set('language', value);
  }, [setLang]);

  return (
    <Container>
      <div className="header-part">
        <Header as="h1">{t('admin')}</Header>
        <Segment
          style={{
            border: 0, boxShadow: 'none', paddingLeft: 0, paddingRight: 0,
          }}
        >
          <Dropdown
            trigger={<span><Icon name="language" size="large" /></span>}
            value={lang}
            options={languageOptions}
            onChange={handleLangChange}
          />
        </Segment>
      </div>


    </Container>
  );
}

export default HeaderComponent;
