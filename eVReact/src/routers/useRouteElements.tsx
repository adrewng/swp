/* eslint-disable react-refresh/only-export-components */
import { Fragment, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import PhoneRequiredModal from '~/components/PhoneRequiredModal'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import Dashboard from '~/layouts/Dashboard'
import MainLayout from '~/layouts/MainLayout'
import Account from '~/pages/Account/layouts/Account'
import AccountAuction from '~/pages/Account/pages/AccountAuctions/AccountAuctions'
import AccountOrders from '~/pages/Account/pages/AccountOrders'
import AccountNotification from '~/pages/Account/pages/Notification/AccountNotification'
import AccountFavorite from '~/pages/Account/pages/Posts/AccountFavorite'
import AccountPost from '~/pages/Account/pages/Posts/AccountPost'
import AccountProfile from '~/pages/Account/pages/Profile/AccountProfile'
import AccountTransaction from '~/pages/Account/pages/Transaction/AccountTransaction'
import AuctionManagement from '~/pages/admin/AuctionManagement/AuctionManagement'
import Home from '~/pages/admin/Home/Home'
import PackageManagment from '~/pages/admin/PackageManagement/PackageManagement'
import PostManagement from '~/pages/admin/PostManagement/PostManagement'
import TransactionManagment from '~/pages/admin/TransactionManagement/TransactionManagment'
import UserManagement from '~/pages/admin/UserManagement/UserManagement'
import AllAuctionList from '~/pages/AllAuctionList/AllAuctionList'
import AllProductList from '~/pages/AllProductList'
import AuctionRequest from '~/pages/Auction/AuctionRequest'
import BatteryList from '~/pages/BatteryList'
import CheckoutPage from '~/pages/CheckoutPage/CheckoutPage'
import LandingPage from '~/pages/LandingPage/LandingPage'
import Login from '~/pages/Login'
import PageNotFound from '~/pages/PageNotFound'
import Post from '~/pages/Post'
import PostDetail from '~/pages/PostDetail'
import PricingPage from '~/pages/PricingPage/PricingPage'
import ProfileUser from '~/pages/ProfileUser'
import Register from '~/pages/Register'
import UpdateRejectedPostMock from '~/pages/UpdateRejectedPostMock'
import VehicleList from '~/pages/VehicleList'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} replace />
}

function RejectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  if (!isAuthenticated) return <Outlet />
  const next = profile?.role === 'admin' ? path.adminDashboard : path.home
  return <Navigate to={next} replace />
}

//Chặn Admin
function RedirectAdminFromPublic() {
  const { profile } = useContext(AppContext)
  return profile?.role === 'admin' ? <Navigate to={path.adminDashboard} replace /> : <Outlet />
}

function PhoneRequiredWrapper() {
  const { profile } = useContext(AppContext)
  return profile?.phone ? <Outlet /> : <PhoneRequiredModal isOpen />
}

function RoleGuard({ role }: { role: 'customer' | 'admin' | 'staff' }) {
  const { profile } = useContext(AppContext)
  if (!profile || profile.role !== role) return <Navigate to={path.home} replace />
  return <Outlet />
}

export default function useRouteElements() {
  const element = useRoutes([
    // Public
    {
      path: path.landingPage, // '/'
      element: <RedirectAdminFromPublic />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          element: <MainLayout />,
          children: [
            { path: path.home, element: <AllProductList /> },
            { path: path.vehicle, element: <VehicleList /> },
            { path: path.battery, element: <BatteryList /> },
            { path: path.pricing, element: <PricingPage /> },
            // { path: path.checkout, element: <CheckoutPage /> },
            { path: path.postDetail, element: <PostDetail /> },
            { path: path.updatePostReject, element: <UpdateRejectedPostMock /> },
            { path: path.auction, element: <AllAuctionList /> },
            { path: path.profileUser, element: <ProfileUser /> }
          ]
        }
      ]
    },
    // Rejected
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        { path: path.login, element: <Login /> },
        { path: path.register, element: <Register /> }
      ]
    },
    // Protected
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.account,
          element: <Account />,
          children: [
            { path: path.accountPosts, element: <AccountPost /> },
            { path: path.accountFavorite, element: <AccountFavorite /> },
            { path: path.accountProfile, element: <AccountProfile /> },
            { path: path.accountNotification, element: <AccountNotification /> },
            { path: path.accountTransaction, element: <AccountTransaction /> },
            { path: path.accountOrders, element: <AccountOrders /> },
            { path: path.accountAuction, element: <AccountAuction /> }
          ]
        },
        { path: path.checkout, element: <CheckoutPage /> },

        {
          path: path.post,
          element: <PhoneRequiredWrapper />,
          children: [
            {
              path: path.post,
              element: (
                <MainLayout>
                  <Post />
                </MainLayout>
              )
            }
          ]
        },
        {
          path: path.admin,
          element: <RoleGuard role='admin' />,
          children: [
            {
              element: <Dashboard />, // layout
              children: [
                { index: true, element: <Home /> },
                { path: 'dashboard', element: <Home /> },
                { path: path.adminPosts, element: <PostManagement /> },
                { path: path.adminUsers, element: <UserManagement /> },
                { path: path.adminTransactions, element: <TransactionManagment /> },
                { path: path.adminAuctions, element: <AuctionManagement /> },
                { path: path.adminPackages, element: <PackageManagment /> }
              ]
            }
          ]
        },
        {
          path: path.payment,
          element: <Fragment />
        },
        {
          path: path.landingPage,
          element: <MainLayout />,
          children: [
            { path: path.requestAution, element: <AuctionRequest /> },
            { path: path.updatePostReject, element: <UpdateRejectedPostMock /> }
          ]
        }
      ]
    },
    // 404
    { path: '*', element: <PageNotFound /> }
  ])
  return element
}
