import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { icon } from '~/assert/icon/icon'
import Button from '~/component/Button'
// import Avatar from '~/component/Avatar/Avatar';
// import Tippy from '@tippyjs/react/headless';

const user = [
  {
    name: 'a',
    createdAt: ''
  },{
    name: 'a',
    createdAt: ''
  },{
    name: 'a',
    createdAt: ''
  },{
    name: 'a',
    createdAt: ''
  }
]

const ManageUser = () => {
  const [userList, setUserList] = useState(user)

  return (
    <Container>
      <Header>
        <div className="title">Users</div>
        <div className="description">Managing user's state</div>
      </Header>

      <Form>
        <div className="content">
          <div className="add">
            <Button title="Add new user" active={true} />
          </div>

          <div className="search">
            <input type="text" placeholder="Search user..." />
          </div>

          <table className="list">
            <thead>
              <tr>
                <th id="id" style={{ textAlign: 'center' }}>
                  ID
                </th>
                <th id="user">User</th>
                <th id="status">Status</th>
                <th id="date">Create Date</th>
                <th id="role">Access Level</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {userList.length >= 1 &&
                userList.map((user, idx) => {
                    return (
                      <tr
                        key={idx}
                        style={
                          idx % 2 === 0
                            ? { backgroundColor: 'grey' }
                            : {}
                        }
                      >
                        <td style={{ textAlign: 'center' }}>{user.id}</td>
                        <td>
                          <div className="user">
                            <div className="info">
                              <div className="name">{user.name}</div>
                              <div className="username"></div>
                            </div>
                          </div>
                        </td>
                        <td
                          className={`${
                            user.Status === 'Online' ? 'online' : 'offline'
                          }`}
                        >
                          <span>
                            {user.Status === 'Online' ? 'Online' : 'Offline'}
                          </span>
                        </td>

                        <td></td>
                        <td>
                          <div
                            className="role-btn"
                            // onClick={() => handleIsRuleOptionOpen(idx)}
                          >
                            <icon.adminRole />
                            <span></span>
                          </div>
                        </td>
                        <td>
                          <div className="option">
                            <div className="icon">
                              <icon.option />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )

                })}
            </tbody>
          </table>
        </div>
      </Form>
    </Container>
  )
}

export default ManageUser

const Container = styled.div`
  height: calc(100vh - var(--header-height));
`
const Header = styled.header`
  padding: 16px 20px;
  .title {
    font-size: 2rem;
    font-weight: 900;
  }
  .description {
    color: var(--secondary_admin);
    font-size: 1.4rem;
  }
`

const Form = styled.div`
  max-width: calc(100% - 40px);
  margin: 16px 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  .content {
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .add {
      flex: 1;
    }
    .search {
      input {
        display: block;
        width: 280px;
        padding: 0.55rem 1rem;
        font-size: 1.35rem;
        font-weight: 400;
        line-height: 1.5;
        color: #75868f;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.07);
        appearance: none;
        border-radius: 0.4375rem;
        box-shadow: inset 0 1px 2px rgb(55 60 67 / 8%);
        transition: border-color 0.35s ease-in-out, box-shadow 0.35s ease-in-out;
        &:focus {
          color: #75868f;
          background-color: #fff;
          border-color: #25476a;
          outline: 0;
          box-shadow: inset 0 1px 2px rgb(55 60 67 / 8%),
            0 0 0.75rem 0 rgb(0 0 0 / 13%);
        }
      }
    }
    .list {
      width: 100%;
      thead,
      tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed; /* even columns width , fix width of table too*/
      }
      thead {
        font-size: 1.3rem;
        border-bottom: 2px solid black;
        tr {
          th {
            text-align: start;
            padding: 12px 8px;
          }
        }
      }
      tbody {
        display: block;
        height: 60vh;
        overflow: auto;
        tr {
          font-size: 1.2rem;
          td {
            color: var(--text-color);
            padding: 12px 8px;

            .option {
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                cursor: pointer;
                font-size: 15px;
                position: relative;
              }
            }
            .role-btn {
              --btn-height: 30px;
              position: relative;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5px;
              background: var(--role-admin);
              color: white;
              max-width: 100px;
              height: var(--btn-height);
              border-radius: 7px;
              svg {
                font-size: 1.7rem;
              }
            }
            &.online {
              span {
                color: var(--online);
              }
            }
            &.offline {
              span {
                color: var(--offline);
              }
            }
            .user {
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              align-items: center;
              .img-wrap {
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              img {
                width: 100%;
              }
            }
            .info {
              margin-left: 10px;
              text-align: start;
              .name {
                font-weight: 700;
              }
              .username {
                font-size: 1.2rem;
                color: var(--side-bar-normal-text);
              }
            }
          }
        }
      }
    }
  }
`
