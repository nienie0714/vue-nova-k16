<template>
  <div class="download">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>产品管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>
          视频产品线
        </el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-button type="primary" icon="search" @click="addVisible">新增设备</el-button>
      </div>
      <el-table :data="tableData" border height="550" style="width: 100%" :cell-style="cellStyle">
        <el-table-column width="60px" fixed="left" prop="num" label="序号"></el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <div @click="handleselect(scope.row, scope.$index)" class="active">
              <span>{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="产品类型"></el-table-column>
        <el-table-column prop="create_time" label="最新版本"></el-table-column>
        <el-table-column width="60px" prop="update_time" label="状态"></el-table-column>
        <el-table-column prop="update_time" label="产品阶段"></el-table-column>
        <el-table-column prop="update_time" label="所属业务区域"></el-table-column>
        <el-table-column prop="update_time" label="所属产品线"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column width="300px" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row, scope.$index)">修改</el-button>
            <el-button type="success" @click="handleselect(scope.row, scope.$index)">试用</el-button>
            <el-button type="success" @click="handleselectdevice(scope.row, scope.$index)">发布</el-button>
            <el-button type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" center width="30%">
      <el-form ref="form" :model="visible" label-width="80px">
        <el-form-item label="设备名称">
          <el-input v-model="visible.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="visible.remark"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="cancelEdit">取消</el-button>
          <el-button @click="saveEdit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增设备对话框 -->
    <el-dialog title="新增设备" :visible.sync="newVisible" center width="30%">
      <el-form label-width="80px">
        <el-form-item :model="addVisibles" label="设备名称">
          <el-input v-model="addVisibles.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addVisibles.remark"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="newVisible=false">取消</el-button>
          <el-button @click="saveVisible">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions, mapMutations } from 'vuex';
  import { serialize } from '../../utils';
  export default {
    data() {
      return {
        num: Number,
        tableData: [],
        delVisible: false,
        index: Number,
        editVisible: false,
        visible: {
          name: null,
          remark: null
        },
        newVisible: false,
        addVisibles: {
          name: null,
          remark: null
        },
        cancelvisible: {}
      };
    },
    created() {
      this.getEquipment();
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setProductId']),
      //获取产品列表
      getEquipment() {
        this.ajax({
          name: 'getProduct'
        }).then(res => {
          this.tableData = res;
          this.tableData.forEach((item, index) => {
            item.num = index + 1;
          })
        });
      },
      //新增设备模态框
      addVisible() {
        this.newVisible = true;
      },
      //新增设备确认
      saveVisible() {
        this.newVisible = false;
        this.ajax({
          name: 'postProduct',
          data: this.addVisibles
        }).then(res => {
          this.getEquipment();
          this.$message.success('新增成功');
        });
      },
      //删除
      handleDelete(row, index) {
        this.delVisible = true;
        this.idx = row.id;
      },
      //确认删除
      deleteRow() {
        this.delVisible = false;
        this.ajax({
          name: 'deleteProduct',
          id: this.idx
        }).then(res => {
          this.getEquipment()
          this.$message.success('删除成功');
        })
      },
      //编辑
      handleEdit(row, index) {
        this.visible = {
          name: row.name,
          remark: row.remark
        };
        this.editVisible = true;
        this.idx = row.id;
      },
      //确认编辑
      saveEdit() {
        this.editVisible = false;

        this.ajax({
          name: 'editProduct',
          data: this.visible,
          id: this.idx
        }).then(res => {
          this.$message.success('编辑完成');
          this.getEquipment()
        })
      },
      cancelEdit() {
        this.editVisible = false;
      },
      handleselect(row, index) {
        console.log(row);
        this.setProductId(row.id);
        setTimeout(() => {
          this.$router.push({ name: 'Firmware' });
        }, 100)
      },
      cellStyle({ row, column, rowIndex, columnIndex }) {
        if(columnIndex == 1) {
          return '';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped lang="less">
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
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    text-decoration: underline;
    color: blue;
    padding: none;
  }
  .active:active {
  }
  .active:hover {
    cursor: pointer;
  }
</style>
