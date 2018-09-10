<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-button type="primary" icon="search" @click="addUsers">新增用户</el-button>
      </div>
      <div class="search-box">
        <el-form ref="search" :model="userSearch" class="demo-form-inline" :inline="true">
          <el-form-item label="状态">
            <el-select v-model="userSearch.status">
              <el-option v-for="item in status" :key="item.num" :value="item.value" :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="userSearch.roleId" clearable>
              <el-option v-for="item in options" :key="item.num" :value="item.value" :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="userSearch.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="UserList" border style="width: 100%;" ref="multipleTable" height="542">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="index" label="序号" sortable width="80">
        </el-table-column>
        <el-table-column prop="username" label="用户名称" width="120">
        </el-table-column>
        <el-table-column prop="Status" label="状态" width="80">
        </el-table-column>
        <el-table-column prop="roleName" label="角色">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间">
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
            <el-button :disabled="!scope.row.isButtonShow" size="small" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :page-size="10" :current-page="cur_page" layout="total, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="editUser" :model="editUser" label-width="80px" :rules="addUserRule">

        <el-form-item label="用户名称">
          <el-input v-model="editUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editUser.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editUser.status">
            <el-option v-for="item in status" :key="item.num" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editUser.roles" multiple collapse-tags>
            <el-option v-for="item in options" :key="item.num" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editUser.remark"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteUser">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="addVisible" width="30%">
      <el-form :model="addUser" label-width="80px" ref="adduser" :rules="addUserRule" class="demo-ruleForm">
        <el-form-item label="角色">
          <el-select v-model="addUser.roles" placeholder="请选择角色" multiple collapse-tags>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model.number="addUser.phone" maxlength="11" minlength="7"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addUser.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="()=>{addVisible=false;addUser = Object.assign({}, newAddUser);}">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import { getNowFormatDate } from '../../utils';

  export default {
    name: 'user',
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if(!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          if(!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if(phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      }
      return {
        count: 0,
        UserList: [],
        editUserRow: {
          username: '',
          password: '',
          remark: '',
        },
        addVisible: false,
        addUser: {
          roles: [],
          username: '',
          password: '',
          phone: '',
          email: '',
          remark: ''
        },
        addUserRule: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },
        newAddUser: {
          roles: [],
          username: '',
          password: '',
          phone: '',
          email: '',
          remark: ''
        },
        //状态
        status: [
          {
            value: 0,
            label: '无效'
          },
          {
            value: 1,
            label: '有效'
          }
        ],
        editVisible: false,
        editUser: {},
        options: [],
        idx: -1,
        delIndex: Number,
        delVisible: false,
        RoleID: Number,
        cur_page: 1,
        multipleSelection: [],
        userSearch: {
          status: 1
        }
      }
    },
    created() {
      this.getUsers();
      this.getrole();

    },
    methods: {
      ...mapActions(['ajax']),
      // 分页导航
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getUsers();
      },
      getUsers() {
        let d = this.cur_page; //当前页
        let m = 10; //每页显示条数
        let count = (d - 1) * 10 === 0 ? 1 : (d - 1) * 10;
        this.ajax({
          name: 'getUsers',
          data: {
            pageNum: this.cur_page,
            ...this.userSearch
          }
        }).then(res => {
          res.rows.forEach((item, index) => {
            switch(item.status) {
              case 0:
                item.Status = '无效';
                item.isButtonShow = true;
                break;
              case 1:
                item.Status = '有效';
                item.isButtonShow = false;
                break;
              case 2:
                item.Status = '删除'
                break;
              default:
                break;
            }
            let str = '';
            item.roles.forEach((item, index) => {
              str += item.name + ','
            });
            item.roleName = str.substr(0, str.length - 1);;
            item.index = count++;
          });
          this.UserList = res.rows;
          this.count = res.count; //分页

        });
      },
      getrole() {
        this.ajax({
          name: 'getRoles'
        }).then(res => {
          res.forEach(item => {
            let obj = {}
            obj.value = item.id;
            obj.label = item.name;
            this.options.push(obj);
          });
        })
      },
      //新增用户
      addUsers() {
        this.addVisible = true;
      },
      saveAdd() {
        this.addVisible = false;
        this.ajax({
          name: 'addUser',
          data: this.addUser
        }).then(res => {
          this.getUsers();
          this.addUser = Object.assign({}, this.newAddUser)
        });
      },
      //编辑
      handleEdit(row, index) {
        let arr = [];
        row.roles.forEach(item => {
          arr.push(item.id);
        });
        this.editVisible = true;
        this.editUser = {
          username: row.username,
          password: null,
          remark: row.remark,
          phone: row.phone,
          status: row.status,
          email: row.email,
          roles: arr
        }
        this.idx = row.id;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.ajax({
          name: 'editUser',
          data: this.editUser,
          id: this.idx
        }).then(res => {
          this.$message.success('修改成功');
          this.getUsers();
        });
      },
      getRoleName(roldId) {
        switch(roldId) {
          case 1:
            this.editUser.roleName = '超级管理员'
            break;
          case 2:
            this.editUser.roleName = '管理员'
            break;
          case 3:
            this.editUser.roleName = '用户'
          default:
            break;
        }
      },
      //删除
      handleDelete(row, index) {
        this.idx = row.id;
        this.delVisible = true;
        this.delIndex = index;
      },
      // 确定删除
      deleteUser() {
        this.delVisible = false;
        this.ajax({
          name: 'deleteUser',
          id: this.idx
        }).then(res => {
          this.$message.success('删除成功');
          this.getUsers();
        });
      },
      //搜索
      search() {
        this.getUsers();
      }
      // delAll() {
      //   const length = this.multipleSelection.length;
      //   let str = '';
      //   this.del_list = this.del_list.concat(this.multipleSelection);
      //   for(let i = 0; i < length; i++) {
      //     str += this.multipleSelection[i].name + ' ';
      //   }
      //   this.$message.error('删除了' + str);
      //   this.multipleSelection = [];
      // },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // }
    }
  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt {
    font-size: 16px;
    text-align: center;
  }
  .search-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
