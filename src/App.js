import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import News from './components/News/News';
import Story from './components/StoryPage/StoryPage';
import ScrollToTop from './components/shared/ScrollToTop/ScrollToTop';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <News />
        </Route>
        <Route path='/news/:id'>
          <Story />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
