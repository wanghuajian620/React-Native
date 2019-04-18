/*
 * MIT License
 *
 * Copyright (c) 2018 SmartestEE Co., Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/01/20        Wang Huajian
 */

import { TabNavigator } from 'react-navigation';

import Home from './pages/Home';
import Houses from './pages/Houses';
import Top from './pages/Top';
import Settings from './pages/Settings';
import Vip from './pages/Vip';
import Shop from './pages/Shop';
import Project from './pages/Project';
import Artisans from './pages/Artisans';
import Detail from './pages/Detail';

const Tabs = TabNavigator({
  Home: {
    screen: Home,
  },
  Houses: {
    screen: Houses,
  },
  Top: {
    screen: Top,
  },
  Settings: {
    screen: Settings,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#000',
  },
});

const Navigations = {
  Main: { screen: Tabs },
  Vip: { screen: Vip },
  Shop: { screen: Shop },
  Project: { screen: Project },
  Artisans: { screen: Artisans },
  Detail: { screen: Detail },
};

export default Navigations;
