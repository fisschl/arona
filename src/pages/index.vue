<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref } from "vue";

const formRef = ref<FormInstance>();

const formData = reactive({
  accessKeyId: "",
  secretAccessKey: "",
  endpoint: "",
});

const rules = reactive<FormRules>({
  accessKeyId: [
    { required: true, message: "请输入 ACCESS_KEY_ID", trigger: "blur" },
    { min: 3, message: "ACCESS_KEY_ID 长度不能少于 3 个字符", trigger: "blur" },
  ],
  secretAccessKey: [
    { required: true, message: "请输入 SECRET_ACCESS_KEY", trigger: "blur" },
    { min: 8, message: "SECRET_ACCESS_KEY 长度不能少于 8 个字符", trigger: "blur" },
  ],
  endpoint: [
    { required: true, message: "请输入 ENDPOINT", trigger: "blur" },
    {
      pattern: /^https?:\/\/.+/,
      message: "ENDPOINT 必须是有效的 URL 地址",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("表单验证通过！", formData);
      // 这里可以添加提交逻辑
      ElMessage.success("配置保存成功！");
    } else {
      console.log("表单验证失败！", fields);
      ElMessage.error("请检查表单输入！");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  ElMessage.info("表单已重置");
};
</script>

<template>
  <div class="mx-auto my-20 w-max">
    <el-card class="w-96">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">基础配置</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @submit.prevent
      >
        <el-form-item label="ACCESS_KEY_ID" prop="accessKeyId">
          <el-input
            v-model="formData.accessKeyId"
            placeholder="请输入 ACCESS_KEY_ID"
            clearable
            show-word-limit
            maxlength="50"
          />
        </el-form-item>

        <el-form-item label="SECRET_ACCESS_KEY" prop="secretAccessKey">
          <el-input
            v-model="formData.secretAccessKey"
            type="password"
            placeholder="请输入 SECRET_ACCESS_KEY"
            clearable
            show-password
            show-word-limit
            maxlength="100"
          />
        </el-form-item>

        <el-form-item label="ENDPOINT" prop="endpoint">
          <el-input
            v-model="formData.endpoint"
            placeholder="请输入 ENDPOINT (例如: https://s3.amazonaws.com)"
            clearable
            show-word-limit
            maxlength="200"
          />
        </el-form-item>

        <el-form-item>
          <div class="flex gap-4">
            <el-button type="primary" :loading="false" @click="submitForm(formRef)">
              提交
            </el-button>
            <el-button @click="resetForm(formRef)"> 重置 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
