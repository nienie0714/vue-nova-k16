<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="search" @click="addVisible=true">新增角色</el-button>
        <!-- <el-button type="primary" icon="search" @click="deleteRole" :disabled="disabled">删除角色</el-button> -->
      </div>
      <el-table :data="RoleList" border style="width: 100%" ref="multipleTable" height="550">
        <el-table-column prop="num" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="240">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="240">
        </el-table-column>
        <el-table-column prop="operator" label="操作" width="240">
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增对话框 -->
    <el-dialog title="新增角色" :visible.sync="addVisible" center width="30%">
      <el-form :model="addRole">
        <div>
          <el-form-item label="角色名称">
            <el-input v-model="addRole.name" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addRole.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="权限管理">
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="addVisible=false">取消</el-button>
          <el-button @click="saveAdd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" :visible.sync="editVisible" center width="30%">
      <el-form :model="editRole">
        <div>
          <el-form-item label="角色名称">
            <el-input v-model="editRole.name" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editRole.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="权限管理">
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="editVisible=false">取消</el-button>
          <el-button @click="saveEdit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，收确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible=false">取 消</el-button>
        <el-button type="primary" @click="deleteRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import { serialize } from '../../utils';

  export default {
    data() {
      return {
        disabled: false,
        RoleList: [],
        editRoleRow: {
          name: '',
          remark: '',
        },
        addVisible: false,
        addRole: {},
        editVisible: false,
        editRole: {},
        idx: -1,
        delVisible: false,
        delIndex: Number
      };
    },
    created() {
      this.getRoles();
    },
    methods: {
      ...mapActions(['ajax']),
      getRoles() {
        this.ajax({
          name: 'getRoles'
        }).then(res => {
          res.forEach((item, index) => {
            item.num = index + 1;
          });
          this.RoleList = res;
        });
      },
      // 新增
      saveAdd() {
        this.addVisible = false;
        this.ajax({
          name: 'addRole',
          data: this.addRole
        }).then(res => {
          this.getRoles();
        });
      },
      handleEdit(row, index) {
        this.editVisible = true;
        this.editRole = {
          name: row.name,
          remark: row.remark
        };
        this.idx = row.id;
      },
      // 修改
      saveEdit() {
        this.editVisible = false;
        this.ajax({
          name: 'editRole',
          data: this.editRole,
          id: this.idx
        }).then(res => {
          this.$message.success('修改成功');
          this.getRoles();
        });
      },
      // 删除
      handleDelete(row, index) {
        this.idx = row.id;
        this.delVisible = true;
        this.delIndex = index;
      },
      // 确认删除
      deleteRole() {
        this.delVisible = false;
        this.ajax({
          name: 'deleteRole',
          id: this.idx
        }).then(res => {
          this.$message.success('删除成功');
          this.getRoles();
        });
      }
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
</style>