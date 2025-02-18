/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { TabsPageType, TaskDataType } from '@/pages/DataStudio/model';
import { JOB_LIFE_CYCLE } from '@/pages/DevOps/constants';
import { DIALECT } from '@/services/constants';
import { assert } from '@/pages/DataStudio/function';

/**
 * @description: 生成面包屑
 */
export const buildBreadcrumbItems = (breadcrumb: string) => {
  // 如果有 activeBreadcrumbTitle, 则切割 activeBreadcrumbTitle, 生成面包屑数组, 并映射
  const activeBreadcrumbTitleList = Array.from(breadcrumb.split('/')).map((title) => ({
    title: title,
    // path: `/${title}`,
    breadcrumbName: title
  }));

  return activeBreadcrumbTitleList;
};

export const projectCommonShow = (type?: TabsPageType) => {
  return type === TabsPageType.project;
};

export const isOnline = (data: TaskDataType | undefined) => {
  return data ? JOB_LIFE_CYCLE.PUBLISH == data.step : false;
};

export const isCanPushDolphin = (data: TaskDataType | undefined) => {
  return data
    ? JOB_LIFE_CYCLE.PUBLISH === data.step &&
        assert(
          data?.dialect,
          [DIALECT.FLINKSQLENV, DIALECT.SCALA, DIALECT.JAVA, DIALECT.PYTHON_LONG],
          true,
          'notIncludes'
        )
    : false;
};

/**
 * @description: 判断是否为 SQL 方言 | assert is sql dialect
 * @param dialect
 * @param includedFlinkSQL
 */
export const isSql = (dialect: string = '', includedFlinkSQL: boolean = false) => {
  if (!dialect || dialect === '') {
    return false;
  }
  switch (dialect.toLowerCase()) {
    case DIALECT.SQL:
    case DIALECT.MYSQL:
    case DIALECT.ORACLE:
    case DIALECT.SQLSERVER:
    case DIALECT.POSTGRESQL:
    case DIALECT.CLICKHOUSE:
    case DIALECT.PHOENIX:
    case DIALECT.DORIS:
    case DIALECT.HIVE:
    case DIALECT.STARROCKS:
    case DIALECT.PRESTO:
      return true;
    case DIALECT.FLINK_SQL:
      return includedFlinkSQL;
    default:
      return false;
  }
};
