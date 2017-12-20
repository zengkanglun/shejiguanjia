-- -----------------------------
-- Think MySQL Data Transfer 
-- 
-- Host     : 47.89.19.216
-- Port     : 3306
-- Database : shejiguanjia
-- 
-- Part : #1
-- Date : 2017-10-18 17:48:07
-- -----------------------------

SET FOREIGN_KEY_CHECKS = 0;


-- -----------------------------
-- Table structure for `s_action_log`
-- -----------------------------
DROP TABLE IF EXISTS `s_action_log`;
CREATE TABLE `s_action_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '会员ID',
  `log_info` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作内容',
  `log_ip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作IP',
  `add_time` int(10) unsigned NOT NULL COMMENT '操作时间',
  `log_type` tinyint(4) NOT NULL COMMENT '操作类型 1/项目信息 2/过程管理 3/任务 4/通知 5/用户 6/管理 7/财务 8/后台',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_action_log`
-- -----------------------------
INSERT INTO `s_action_log` VALUES ('1', '1', '123', '192.168.2.121', '1508311943', '1');

-- -----------------------------
-- Table structure for `s_archive_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_archive_type`;
CREATE TABLE `s_archive_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='图纸归档类型';

-- -----------------------------
-- Records of `s_archive_type`
-- -----------------------------
INSERT INTO `s_archive_type` VALUES ('1', '归档！');
INSERT INTO `s_archive_type` VALUES ('2', '归档文档C类');
INSERT INTO `s_archive_type` VALUES ('3', 'Archive');
INSERT INTO `s_archive_type` VALUES ('4', '归档！A$');

-- -----------------------------
-- Table structure for `s_build_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_build_type`;
CREATE TABLE `s_build_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名字',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='建筑类型表';

-- -----------------------------
-- Records of `s_build_type`
-- -----------------------------
INSERT INTO `s_build_type` VALUES ('1', '商铺');
INSERT INTO `s_build_type` VALUES ('2', '公园');
INSERT INTO `s_build_type` VALUES ('3', '写字楼');
INSERT INTO `s_build_type` VALUES ('4', '住宅');
INSERT INTO `s_build_type` VALUES ('6', '车库');

-- -----------------------------
-- Table structure for `s_chuchai_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_chuchai_type`;
CREATE TABLE `s_chuchai_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=dec8 COMMENT='出差类型';

-- -----------------------------
-- Records of `s_chuchai_type`
-- -----------------------------
INSERT INTO `s_chuchai_type` VALUES ('1', 'chutu');

-- -----------------------------
-- Table structure for `s_executive`
-- -----------------------------
DROP TABLE IF EXISTS `s_executive`;
CREATE TABLE `s_executive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '经手人ID',
  `executive_time` int(10) unsigned NOT NULL COMMENT '报账时间',
  `overhead_type_id` int(10) unsigned NOT NULL COMMENT '类型ID',
  `amount` decimal(12,2) NOT NULL COMMENT '金额',
  `executive_content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_executive`
-- -----------------------------
INSERT INTO `s_executive` VALUES ('1', '1', '1507877473', '2', '110011.00', '内容！！！', '1507973498', '1507973597');
INSERT INTO `s_executive` VALUES ('2', '1', '1507877473', '2', '110011.00', '内容！！！', '1507973544', '1507973544');

-- -----------------------------
-- Table structure for `s_expense`
-- -----------------------------
DROP TABLE IF EXISTS `s_expense`;
CREATE TABLE `s_expense` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '经手人ID',
  `overhead_type_id` int(10) unsigned NOT NULL COMMENT '报账类型',
  `amount` decimal(12,2) NOT NULL COMMENT '金额',
  `expense_time` int(10) unsigned NOT NULL COMMENT '报账时间',
  `expense_content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '报账内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_expense`
-- -----------------------------
INSERT INTO `s_expense` VALUES ('1', '1', '1', '2', '6666.00', '1507877473', '内容！！！', '1507959577', '1507959577');
INSERT INTO `s_expense` VALUES ('2', '1', '1', '2', '7890.00', '1507877473', '内容！！！', '1507959652', '1507959702');
INSERT INTO `s_expense` VALUES ('3', '2', '1', '2', '1100.00', '1507877473', '内容！！！', '1507959810', '1507967729');

-- -----------------------------
-- Table structure for `s_info`
-- -----------------------------
DROP TABLE IF EXISTS `s_info`;
CREATE TABLE `s_info` (
  `name` varchar(100) DEFAULT NULL COMMENT '单位名称',
  `mobile` varchar(20) DEFAULT NULL COMMENT '单位电话',
  `address` varchar(255) DEFAULT NULL COMMENT '单位信息',
  `zipcode` varchar(10) DEFAULT NULL COMMENT '邮政编码',
  `email` varchar(50) DEFAULT NULL COMMENT '单位邮箱',
  `max_upload_size` int(10) DEFAULT '3145728' COMMENT '最大文件上传限制 单位字节'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='单位信息表';

-- -----------------------------
-- Records of `s_info`
-- -----------------------------
INSERT INTO `s_info` VALUES ('a', '13725309730', 'addfgsadfa', '418000', '18620390442@163.com', '31480');

-- -----------------------------
-- Table structure for `s_letter`
-- -----------------------------
DROP TABLE IF EXISTS `s_letter`;
CREATE TABLE `s_letter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL COMMENT '类型',
  `filename` varchar(255) NOT NULL COMMENT '文件原名',
  `file` varchar(255) NOT NULL COMMENT '文件路径',
  `content` varchar(255) NOT NULL COMMENT '事由',
  `user_id` int(11) NOT NULL COMMENT '发布人ID',
  `time` int(11) NOT NULL COMMENT '时间',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0正常 1删除',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  `data_type` int(11) NOT NULL DEFAULT '1' COMMENT '数据类型 1 是发函管理 2是图纸归档',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COMMENT='发函管理';

-- -----------------------------
-- Records of `s_letter`
-- -----------------------------
INSERT INTO `s_letter` VALUES ('1', '1', 'ofo.txt', '/Uploads/contract/./2017-10-17/96r985q015q55.txt', '测试修改', '1', '1508256000', '1508256000', '1508234601', '1', '1', '0', '1');
INSERT INTO `s_letter` VALUES ('2', '2', '马上嗨微信公众号.txt', '/Uploads/contract/./2017-10-17/6899r55qrq8sn.txt', '测试发函', '1', '1508256000', '1508239757', '1508239757', '0', '1', '0', '2');
INSERT INTO `s_letter` VALUES ('3', '2', '3ce0d3325e60251c04889327e541b828.png', '/Uploads/contract/./2017-10-18/p6rq5200on595.png', '测试发函', '1', '1508256000', '1508297485', '1508297485', '0', '1', '0', '1');
INSERT INTO `s_letter` VALUES ('4', '1', '006iFrXTgy1fjr7xxjztuj31jk2bc1l0.jpg', '/Uploads/contract/./2017-10-18/0q75p679n95ro.jpg', '坎坎坷坷', '1', '1508256000', '1508314473', '1508314473', '0', '1', '0', '1');
INSERT INTO `s_letter` VALUES ('5', '1', '006iFrXTgy1fjr7xxjztuj31jk2bc1l0.jpg', '/Uploads/contract/./2017-10-18/1orn7pq599ro1.jpg', '张召忠', '1', '1508860800', '1508315598', '1508315598', '0', '1', '0', '1');
INSERT INTO `s_letter` VALUES ('6', '4', '006iFrXTgy1fjr7y2ttohj31jk2bd1l1.jpg', '/Uploads/contract/./2017-10-18/r152r35o197s1.jpg', '张召忠', '1', '1508256000', '1508315889', '1508315889', '0', '1', '0', '2');

-- -----------------------------
-- Table structure for `s_letter_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_letter_type`;
CREATE TABLE `s_letter_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='发函管理类型';

-- -----------------------------
-- Records of `s_letter_type`
-- -----------------------------
INSERT INTO `s_letter_type` VALUES ('1', '信函C');
INSERT INTO `s_letter_type` VALUES ('2', '发函');

-- -----------------------------
-- Table structure for `s_migrations`
-- -----------------------------
DROP TABLE IF EXISTS `s_migrations`;
CREATE TABLE `s_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_migrations`
-- -----------------------------
INSERT INTO `s_migrations` VALUES ('1', '2017_10_11_070944_create_user_table', '1');
INSERT INTO `s_migrations` VALUES ('2', '2017_10_11_071021_create_action_log_table', '1');
INSERT INTO `s_migrations` VALUES ('3', '2017_10_11_075626_create_project_table', '1');
INSERT INTO `s_migrations` VALUES ('4', '2017_10_11_081738_create_project_child_table', '1');
INSERT INTO `s_migrations` VALUES ('5', '2017_10_11_082222_create_project_child_work_type_table', '1');
INSERT INTO `s_migrations` VALUES ('6', '2017_10_11_090059_create_work_talbe', '1');
INSERT INTO `s_migrations` VALUES ('7', '2017_10_11_090138_create_schedule_table', '1');
INSERT INTO `s_migrations` VALUES ('8', '2017_10_11_182237_create_receipt_table', '1');
INSERT INTO `s_migrations` VALUES ('9', '2017_10_11_182328_create_task_table', '1');
INSERT INTO `s_migrations` VALUES ('10', '2017_10_12_093853_create_staff_table', '1');
INSERT INTO `s_migrations` VALUES ('11', '2017_10_14_101222_create_expense_table', '2');
INSERT INTO `s_migrations` VALUES ('12', '2017_10_14_102031_create_executive_table', '2');
INSERT INTO `s_migrations` VALUES ('16', '2017_10_14_161657_create_project_commission_table', '3');
INSERT INTO `s_migrations` VALUES ('17', '2017_10_14_161747_create_project_work_commission_table', '3');
INSERT INTO `s_migrations` VALUES ('18', '2017_10_14_161828_create_project_staff_commission_table', '3');

-- -----------------------------
-- Table structure for `s_notice`
-- -----------------------------
DROP TABLE IF EXISTS `s_notice`;
CREATE TABLE `s_notice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` mediumint(8) NOT NULL COMMENT '类型',
  `project_id` int(10) NOT NULL COMMENT '项目id 对应project',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '附件路径',
  `file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '附件原始文件名',
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `user_id` int(10) NOT NULL COMMENT '发起人',
  `receiver` int(10) NOT NULL COMMENT '接收者',
  `addtime` int(10) DEFAULT '0' COMMENT '发起时间',
  `reply` text COLLATE utf8_unicode_ci COMMENT '回复内容',
  `status` tinyint(1) DEFAULT '0' COMMENT '0/正常 1/删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='通知表';

-- -----------------------------
-- Records of `s_notice`
-- -----------------------------
INSERT INTO `s_notice` VALUES ('4', '1', '2', '标题测试', '/Uploads/notice/2017-10-17/65593r63r1216.png', 'default', '内容测试', '1', '1', '1508204910', '', '0');
INSERT INTO `s_notice` VALUES ('5', '1', '2', '标题测试', '/Uploads/notice/2017-10-17/6975979753nnr.png', 'default', '内容测试', '1', '1', '1508210346', '', '0');
INSERT INTO `s_notice` VALUES ('6', '1', '2', '标题测试', '/Uploads/notice/2017-10-18/o499r6r5ps9s2.png', 'default', '内容测试', '1', '1', '1508298740', 'qwertyuio', '0');
INSERT INTO `s_notice` VALUES ('7', '1', '2', '标题测试', '/Uploads/notice/2017-10-18/93442650qr009.png', 'default', '内容测试', '1', '1', '1508298755', '123456781234567', '0');
INSERT INTO `s_notice` VALUES ('8', '3', '1', '12345555555555', '', '', '12345678', '1', '3', '1508305013', '', '0');
INSERT INTO `s_notice` VALUES ('9', '1', '1', '来自wangluyao的', 'C:\\fakepath\\c9d52eb5.ini', '', '跑1000M', '1', '14', '1508309379', '', '0');
INSERT INTO `s_notice` VALUES ('10', '1', '1', '111111', '', '', '1111111111111111111', '1', '2', '1508309936', '', '0');

-- -----------------------------
-- Table structure for `s_notice_receive`
-- -----------------------------
DROP TABLE IF EXISTS `s_notice_receive`;
CREATE TABLE `s_notice_receive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '通知接收者id',
  `pid` int(10) NOT NULL COMMENT '对应通知表id',
  `addtime` int(10) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1' COMMENT '1/未接收 2/已读 3/已回复 4/软删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `s_notice_receive`
-- -----------------------------
INSERT INTO `s_notice_receive` VALUES ('4', '1', '4', '1508204911', '4');
INSERT INTO `s_notice_receive` VALUES ('5', '1', '5', '1508210346', '4');
INSERT INTO `s_notice_receive` VALUES ('6', '1', '6', '1508298741', '4');
INSERT INTO `s_notice_receive` VALUES ('7', '1', '7', '1508298755', '3');
INSERT INTO `s_notice_receive` VALUES ('8', '3', '8', '1508305013', '1');
INSERT INTO `s_notice_receive` VALUES ('9', '14', '9', '1508309379', '1');
INSERT INTO `s_notice_receive` VALUES ('10', '2', '10', '1508309936', '1');

-- -----------------------------
-- Table structure for `s_notice_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_notice_type`;
CREATE TABLE `s_notice_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='通知类型表';

-- -----------------------------
-- Records of `s_notice_type`
-- -----------------------------
INSERT INTO `s_notice_type` VALUES ('1', '通知类型1');
INSERT INTO `s_notice_type` VALUES ('2', '通知类型2');
INSERT INTO `s_notice_type` VALUES ('3', '的');
INSERT INTO `s_notice_type` VALUES ('4', 'f');

-- -----------------------------
-- Table structure for `s_overhead_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_overhead_type`;
CREATE TABLE `s_overhead_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  `type` tinyint(1) DEFAULT NULL COMMENT '1/项目支出 2/行政支出',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='支出类型表';

-- -----------------------------
-- Records of `s_overhead_type`
-- -----------------------------
INSERT INTO `s_overhead_type` VALUES ('1', 'test', '1');
INSERT INTO `s_overhead_type` VALUES ('2', 'ook', '1');
INSERT INTO `s_overhead_type` VALUES ('3', 'ccav', '1');
INSERT INTO `s_overhead_type` VALUES ('4', '十九大', '2');
INSERT INTO `s_overhead_type` VALUES ('5', '我爱中国', '2');
INSERT INTO `s_overhead_type` VALUES ('6', '小学生', '2');

-- -----------------------------
-- Table structure for `s_picture`
-- -----------------------------
DROP TABLE IF EXISTS `s_picture`;
CREATE TABLE `s_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participate` int(10) NOT NULL COMMENT '参与人ID',
  `type` int(10) NOT NULL COMMENT '类型',
  `num` int(10) NOT NULL COMMENT '数量',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `user_id` int(11) NOT NULL COMMENT '发布人ID',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0整除 1删除',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='出图出差';

-- -----------------------------
-- Records of `s_picture`
-- -----------------------------
INSERT INTO `s_picture` VALUES ('1', '2', '1', '2', '出差记录', '1', '1508220748', '1508225061', '1', '0', '0');
INSERT INTO `s_picture` VALUES ('2', '2', '1', '2', '出差记录2', '1', '1508309801', '1508309801', '1', '0', '0');
INSERT INTO `s_picture` VALUES ('3', '2', '1', '2', '出差记录3', '1', '1508310016', '1508310016', '1', '0', '0');
INSERT INTO `s_picture` VALUES ('4', '1', '1', '4', '撒莎莎', '1', '1508310185', '1508310185', '1', '0', '0');
INSERT INTO `s_picture` VALUES ('5', '1', '1', '3', '张召忠', '1', '1508315463', '1508315463', '1', '0', '0');

-- -----------------------------
-- Table structure for `s_process`
-- -----------------------------
DROP TABLE IF EXISTS `s_process`;
CREATE TABLE `s_process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `type` int(11) NOT NULL COMMENT '类型',
  `time` int(11) NOT NULL COMMENT '时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0正常 1删除',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COMMENT='过程纪要';

-- -----------------------------
-- Records of `s_process`
-- -----------------------------
INSERT INTO `s_process` VALUES ('1', '1', '3', '1486051200', '1486051200', '1486051200', 'sed', '1', '1', '1508241279');
INSERT INTO `s_process` VALUES ('2', '1', '3', '1486051200', '1486051200', '1486051200', 'sed', '1', '0', '0');
INSERT INTO `s_process` VALUES ('3', '2', '2', '1486051200', '1486051200', '0', 's', '1', '0', '0');
INSERT INTO `s_process` VALUES ('4', '2', '3', '1486051200', '1486051200', '0', 's', '1', '0', '0');
INSERT INTO `s_process` VALUES ('5', '2', '2', '1486051200', '1486051200', '1486051200', 'sed', '1', '1', '0');
INSERT INTO `s_process` VALUES ('6', '2', '1', '1486051200', '1486051200', '1486051200', 'sed666666666666666666666666666', '1', '1', '0');
INSERT INTO `s_process` VALUES ('7', '3', '1', '1486051200', '1486051200', '0', '1234567890-', '1', '1', '0');
INSERT INTO `s_process` VALUES ('8', '3', '1', '1510243200', '1508307263', '1508307263', '测试添加过程', '1', '0', '0');
INSERT INTO `s_process` VALUES ('9', '3', '1', '0', '1508307473', '1508307473', '测试添加过程', '1', '0', '0');
INSERT INTO `s_process` VALUES ('10', '3', '1', '1508256000', '1508307509', '1508307509', '啥快递卡三级地', '1', '0', '0');
INSERT INTO `s_process` VALUES ('11', '1', '2', '1508256000', '1508307529', '1508307529', '重中之重做做', '1', '0', '0');
INSERT INTO `s_process` VALUES ('12', '5', '3', '1508256000', '1508307600', '1508307600', '啥啥啥啥啥啥', '1', '0', '0');
INSERT INTO `s_process` VALUES ('13', '5', '3', '1508256000', '1508307629', '1508307629', '啦啦啦啦', '1', '0', '0');
INSERT INTO `s_process` VALUES ('14', '1', '1', '0', '1508309460', '1508309460', '来啊啊来了', '1', '0', '0');
INSERT INTO `s_process` VALUES ('15', '7', '1', '0', '1508309484', '1508309484', '时代峰峻开会水电费计划啥的', '1', '0', '0');
INSERT INTO `s_process` VALUES ('16', '7', '1', '0', '1508309684', '1508309684', '点点滴滴', '1', '0', '0');
INSERT INTO `s_process` VALUES ('17', '7', '1', '0', '1508309884', '1508309884', '电饭锅', '1', '0', '0');
INSERT INTO `s_process` VALUES ('18', '7', '1', '0', '1508310061', '1508310061', '多撒多所所多所多所多所多所多', '1', '0', '0');
INSERT INTO `s_process` VALUES ('19', '1', '1', '1508256000', '1508315439', '1508315439', '张召忠', '1', '0', '0');

-- -----------------------------
-- Table structure for `s_process_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_process_type`;
CREATE TABLE `s_process_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='过程纪要类型表';

-- -----------------------------
-- Records of `s_process_type`
-- -----------------------------
INSERT INTO `s_process_type` VALUES ('1', '过程管理');
INSERT INTO `s_process_type` VALUES ('2', '过程FM2S');
INSERT INTO `s_process_type` VALUES ('3', '过程-标准');

-- -----------------------------
-- Table structure for `s_project`
-- -----------------------------
DROP TABLE IF EXISTS `s_project`;
CREATE TABLE `s_project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目编号',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目名称',
  `project_time` int(10) unsigned NOT NULL COMMENT '立项时间',
  `province` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '省份',
  `city` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '城市',
  `building_type` int(10) unsigned NOT NULL COMMENT '建筑类型ID',
  `stage` int(10) unsigned NOT NULL COMMENT '阶段类型ID',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目地址',
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '合同文件原文件名',
  `file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '项目合同文件',
  `build` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '建设单位',
  `tel` char(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)联系电话',
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '电子邮箱',
  `contact_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系地址',
  `supervisor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)项目主管',
  `supervisor_tel` char(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)项目主管联系电话',
  `director_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目主管ID',
  `money` float(11,2) NOT NULL DEFAULT '0.00' COMMENT '合同总额',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0进行中 1是完结 2是中断',
  `sche_id` int(10) NOT NULL DEFAULT '0' COMMENT '项目进度ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '项目创建者ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project`
-- -----------------------------
INSERT INTO `s_project` VALUES ('1', 'HZ201710126842', '天空之城', '1507773600', '广东', '广州', '1', '1', '广州某个地方 测试', '设计管家数据字典.xlsx', '/Uploads/contract/./2017-10-12/rrs7o5r2qnq9o.xlsx', '广州一建', '18819171134', '1293719114@qq.com', '广州某个地方', '陈主管', '18819171134', '2', '1000011.00', '0', '2', '1507780399', '1507780399', '1');
INSERT INTO `s_project` VALUES ('2', 'HZ201710126842', '天空之城', '1507773600', '广东', '广州', '1', '1', '维权撒多', 'complete_icon_220x220.png', '/Uploads/contract/./2017-10-17/6p2rpr560p695.png', '朋友，别走', '13330114238', '123sad@qq.com', '123', '123王企鹅', '13330114238', '1', '200.00', '0', '3', '1507865659', '1508235886', '1');
INSERT INTO `s_project` VALUES ('3', 'HZ2017101268421', '天空之城112', '1507946400', '广东', '广州', '1', '1', '广州某个地方', '', '', '广州一建', '18819171134', '1293719114@qq.com', '广州某个地方', '陈主管', '18819171134', '1', '1000000.00', '0', '5', '1507865678', '1507865678', '1');
INSERT INTO `s_project` VALUES ('4', 'HZ2017101268421', '高楼大厦', '1507946400', '广东', '广州', '1', '1', '广州某个地方', '', '', '广州一建', '18819171134', '1293719114@qq.com', '广州某个地方', '陈主管', '18819171134', '1', '1000000.00', '1', '7', '1507865736', '1507865736', '1');
INSERT INTO `s_project` VALUES ('5', 'HZ2017101268421', '高楼大厦666', '1507946400', '广东', '广州', '1', '1', '广州某个地方', '', '', '广州一建', '18819171134', '1293719114@qq.com', '广州某个地方', '陈主管', '18819171134', '1', '1000000.00', '1', '9', '1507865743', '1507865743', '1');
INSERT INTO `s_project` VALUES ('6', '5+4', '789789', '1507046400', '江西省', '吉安市', '0', '1', '7897897', '', '', '78978', '789879', '57781@qq.com', '78979', '87979', '789879', '1', '42645.00', '0', '0', '1508115019', '1508115019', '1');
INSERT INTO `s_project` VALUES ('7', '5+4', '789789', '1507046400', '江西省', '吉安市', '0', '1', '7897897', '', '', '78978', '789879', '57781@qq.com', '78979', '87979', '789879', '1', '42645.00', '0', '0', '1508115022', '1508115022', '1');
INSERT INTO `s_project` VALUES ('8', '5+4', '789789', '1507046400', '江西省', '吉安市', '0', '1', '7897897', '', '', '78978', '789879', '57781@qq.com', '78979', '87979', '789879', '1', '42645.00', '0', '0', '1508115028', '1508115028', '1');
INSERT INTO `s_project` VALUES ('9', '5+4', '789789', '1507046400', '江西省', '吉安市', '0', '1', '7897897', '', '', '78978', '789879', '57781@qq.co', '78979', '87979', '789879', '1', '42645.00', '0', '0', '1508115066', '1508115066', '1');
INSERT INTO `s_project` VALUES ('10', '5+4', '789789', '1507046400', '江西省', '吉安市', '0', '1', '7897897', '', '', '78978', '789879', '57781@qq.co', '78979', '87979', '789879', '1', '42645.00', '0', '0', '1508115072', '1508115072', '1');
INSERT INTO `s_project` VALUES ('11', '10086', '创建项目测试', '1508083200', '黑龙江省', '双鸭山市', '0', '1', '珠江新城', '', '', '阿达', '18819400405', '1333qw.@qq.com', '珠江新城', '李', '18819400405', '1', '1000.00', '0', '0', '1508120138', '1508120138', '1');
INSERT INTO `s_project` VALUES ('12', '1325465', '54645646565', '1508256000', '广东省', '广州市', '0', '1', '珠江岸边', '', '', '山谷', '13330114238', '57781@qq.com', 'saudauiosauo', '米子', '13330114238', '1', '120.22', '0', '0', '1508206763', '1508206763', '1');
INSERT INTO `s_project` VALUES ('13', '13310086', '焰分噬浪尺', '1507651200', '安徽省', '亳州市', '0', '1', '天上人间', '', '', '建设中心', '13330114238', '15632@qq.com', '133330114238', '猛踩', '18819400405', '6', '50.00', '0', '0', '1508219416', '1508219416', '1');
INSERT INTO `s_project` VALUES ('14', 'ewr', 'werewrwerwr', '1508342400', '内蒙古', '乌海市', '0', '1', 'werwrwr', '', '', 'werwr', '13330144238', '156@qq.com', 'qewq', 'ewrwrw', '13330114238', '11', '4154.00', '0', '0', '1508221132', '1508221132', '1');
INSERT INTO `s_project` VALUES ('15', 'ewr', 'werewrwerwr', '1508342400', '内蒙古', '乌海市', '0', '1', 'werwrwr', '', '', 'werwr', '13330144238', '156@qq.com', 'qewq', 'ewrwrw', '13330114238', '11', '4154.00', '0', '0', '1508221165', '1508221165', '1');
INSERT INTO `s_project` VALUES ('16', 'ewr', 'werewrwerwr', '1508342400', '内蒙古', '乌海市', '0', '1', 'werwrwr', '', '', 'werwr', '13330144238', '15sa6@qq.com', 'qewq', 'ewrwrw', '13330114238', '11', '4154.00', '0', '0', '1508221195', '1508221195', '1');
INSERT INTO `s_project` VALUES ('17', 'ewr', 'werewrwerwr', '1508342400', '内蒙古', '乌海市', '0', '1', 'werwrwr', '', '', 'werwr', '13330144238', '15sa6@qq.com', 'qewq', 'ewrwrw', '13330114238', '11', '4154.00', '0', '0', '1508221218', '1508221218', '1');
INSERT INTO `s_project` VALUES ('18', 'libai007', '静夜思', '1507651200', '浙江省', '绍兴市', '1', '1', 'asda', 'activity_150x150.png', '/Uploads/contract/./2017-10-17/505r4p0p24q9s.png', 'asdadad', '13330114238', 'sada@qq.com', '152544684', 'asdsa', '13330114238', '1', '10.22', '0', '0', '1508233005', '1508233005', '1');
INSERT INTO `s_project` VALUES ('19', 'libai007', '静夜思', '1507651200', '浙江省', '绍兴市', '1', '1', 'asda', 'activity_150x150.png', '/Uploads/contract/./2017-10-17/p558q0qr95493.png', 'asdadad', '13330114238', 'sada@qq.com', '152544684', 'asdsa', '13330114238', '1', '10.22', '0', '0', '1508233348', '1508233348', '1');
INSERT INTO `s_project` VALUES ('20', 'asdadada', 'asdad', '1507651200', '安徽省', '淮北市', '1', '1', 'asdada', 'activity_150x150.png', '/Uploads/contract/./2017-10-17/0965qpr5q1rs1.png', 'asdadad', '13330114238', '122@qq.com', '1asadsa', 'asdad', '18845872951', '1', '100.00', '0', '0', '1508233414', '1508233414', '1');

-- -----------------------------
-- Table structure for `s_project_child`
-- -----------------------------
DROP TABLE IF EXISTS `s_project_child`;
CREATE TABLE `s_project_child` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '子项目名称',
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project_child`
-- -----------------------------
INSERT INTO `s_project_child` VALUES ('1', '地基', '1', '1507791941', '1507791941');
INSERT INTO `s_project_child` VALUES ('2', '亭台楼阁', '1', '1507791942', '1507791942');
INSERT INTO `s_project_child` VALUES ('3', '测试', '2', '1507890336', '1507890336');
INSERT INTO `s_project_child` VALUES ('4', '子项58', '12', '1508212462', '1508212462');
INSERT INTO `s_project_child` VALUES ('5', '子项36', '12', '1508212462', '1508212462');
INSERT INTO `s_project_child` VALUES ('6', '子项98', '12', '1508212783', '1508212783');
INSERT INTO `s_project_child` VALUES ('7', '子项68', '12', '1508212783', '1508212783');
INSERT INTO `s_project_child` VALUES ('8', '子项98', '12', '1508212822', '1508212822');
INSERT INTO `s_project_child` VALUES ('9', '子项68', '12', '1508212822', '1508212822');
INSERT INTO `s_project_child` VALUES ('10', '子项98', '12', '1508212883', '1508212883');
INSERT INTO `s_project_child` VALUES ('11', '子项68', '12', '1508212883', '1508212883');
INSERT INTO `s_project_child` VALUES ('12', '天涯何处无芳草', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child` VALUES ('13', '枝上柳绵吹又少', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child` VALUES ('14', '子项目一', '10', '1508220235', '1508220235');
INSERT INTO `s_project_child` VALUES ('15', '子项目一', '10', '1508220235', '1508220235');
INSERT INTO `s_project_child` VALUES ('16', '子项目一', '15', '1508220353', '1508220353');
INSERT INTO `s_project_child` VALUES ('17', '子项目一', '15', '1508220376', '1508220376');
INSERT INTO `s_project_child` VALUES ('18', '子项目一', '15', '1508220414', '1508220414');
INSERT INTO `s_project_child` VALUES ('19', '子项目一', '10', '1508220461', '1508220461');
INSERT INTO `s_project_child` VALUES ('20', '子项目一', '10', '1508220953', '1508220953');
INSERT INTO `s_project_child` VALUES ('21', '子项目一2', '10', '1508220953', '1508220953');
INSERT INTO `s_project_child` VALUES ('22', '子项1223', '17', '1508221260', '1508221260');
INSERT INTO `s_project_child` VALUES ('23', '子项1223', '17', '1508221267', '1508221267');
INSERT INTO `s_project_child` VALUES ('24', '子项目一23', '20', '1508233768', '1508233768');
INSERT INTO `s_project_child` VALUES ('25', '子项目一3', '20', '1508233768', '1508233768');

-- -----------------------------
-- Table structure for `s_project_child_work_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_project_child_work_type`;
CREATE TABLE `s_project_child_work_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户（负责人）ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project_child_work_type`
-- -----------------------------
INSERT INTO `s_project_child_work_type` VALUES ('1', '9', '3', '2', '1507791941', '1508142014');
INSERT INTO `s_project_child_work_type` VALUES ('2', '2', '3', '1', '1507791942', '1507791942');
INSERT INTO `s_project_child_work_type` VALUES ('3', '1', '2', '1', '1507791942', '1507791942');
INSERT INTO `s_project_child_work_type` VALUES ('4', '8', '4', '2', '1507791942', '1508142014');
INSERT INTO `s_project_child_work_type` VALUES ('5', '1', '0', '3', '1507890336', '1507890336');
INSERT INTO `s_project_child_work_type` VALUES ('6', '2', '3', '3', '1507890336', '1507890336');
INSERT INTO `s_project_child_work_type` VALUES ('7', '1', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('8', '2', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('9', '3', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('10', '4', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('11', '5', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('12', '6', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('13', '7', '0', '4', '1508212462', '1508212462');
INSERT INTO `s_project_child_work_type` VALUES ('14', '1', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('15', '2', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('16', '3', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('17', '4', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('18', '5', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('19', '6', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('20', '7', '0', '6', '1508212783', '1508212783');
INSERT INTO `s_project_child_work_type` VALUES ('21', '1', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('22', '2', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('23', '3', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('24', '4', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('25', '5', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('26', '6', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('27', '7', '0', '8', '1508212822', '1508212822');
INSERT INTO `s_project_child_work_type` VALUES ('28', '1', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('29', '2', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('30', '3', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('31', '4', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('32', '5', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('33', '6', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('34', '7', '0', '10', '1508212883', '1508212883');
INSERT INTO `s_project_child_work_type` VALUES ('35', '1', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('36', '2', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('37', '3', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('38', '4', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('39', '5', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('40', '6', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('41', '7', '0', '12', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('42', '1', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('43', '2', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('44', '3', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('45', '4', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('46', '5', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('47', '6', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('48', '7', '0', '13', '1508219723', '1508219723');
INSERT INTO `s_project_child_work_type` VALUES ('49', '1', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('50', '2', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('51', '3', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('52', '4', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('53', '5', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('54', '6', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('55', '7', '0', '14', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('56', '1', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('57', '2', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('58', '3', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('59', '4', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('60', '5', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('61', '6', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('62', '7', '0', '15', '1508220235', '1508220235');
INSERT INTO `s_project_child_work_type` VALUES ('63', '1', '10', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('64', '2', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('65', '3', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('66', '4', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('67', '5', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('68', '6', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('69', '7', '0', '20', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('70', '1', '10', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('71', '2', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('72', '3', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('73', '4', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('74', '5', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('75', '6', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('76', '7', '0', '21', '1508220953', '1508220953');
INSERT INTO `s_project_child_work_type` VALUES ('77', '1', '2', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('78', '2', '0', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('79', '3', '0', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('80', '4', '0', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('81', '5', '6', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('82', '6', '7', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('83', '7', '0', '22', '1508221260', '1508221260');
INSERT INTO `s_project_child_work_type` VALUES ('84', '1', '2', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('85', '2', '0', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('86', '3', '0', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('87', '4', '0', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('88', '5', '6', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('89', '6', '7', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('90', '7', '0', '23', '1508221267', '1508221267');
INSERT INTO `s_project_child_work_type` VALUES ('91', '1', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('92', '2', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('93', '3', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('94', '4', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('95', '5', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('96', '6', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('97', '7', '0', '24', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('98', '1', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('99', '2', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('100', '3', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('101', '4', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('102', '5', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('103', '6', '0', '25', '1508233768', '1508233768');
INSERT INTO `s_project_child_work_type` VALUES ('104', '7', '0', '25', '1508233768', '1508233768');

-- -----------------------------
-- Table structure for `s_project_commission`
-- -----------------------------
DROP TABLE IF EXISTS `s_project_commission`;
CREATE TABLE `s_project_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `supervisor_id` int(10) unsigned NOT NULL COMMENT '主管ID',
  `supervisor_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '主管计提比例',
  `supervisor_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '主管获得计提金额',
  `group_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '项目组计提比例',
  `amount` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '计提总金额',
  `start_time` int(10) unsigned NOT NULL COMMENT '计提开始时间',
  `end_time` int(10) unsigned NOT NULL COMMENT '计提结束时间',
  `is_submit` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '审核状态：0-待提交，1-已提交',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-待审核，1-已审核，2-审核不通过',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project_commission`
-- -----------------------------
INSERT INTO `s_project_commission` VALUES ('3', '1', '1', '2', '0.00', '0.00', '0.00', '0.00', '1508220072', '1508220074', '1', '1', '1508224759', '1508224759');
INSERT INTO `s_project_commission` VALUES ('4', '1', '1', '2', '0.00', '0.00', '0.00', '0.00', '1508220072', '1508220074', '0', '0', '1508306603', '1508306603');

-- -----------------------------
-- Table structure for `s_project_staff_commission`
-- -----------------------------
DROP TABLE IF EXISTS `s_project_staff_commission`;
CREATE TABLE `s_project_staff_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `project_commission_id` int(10) unsigned NOT NULL COMMENT '计提基本信息表ID',
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '员工ID',
  `commission_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '员工计提比例',
  `commission_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '员工获得计提金额',
  `labor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分工情况',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工作内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project_staff_commission`
-- -----------------------------
INSERT INTO `s_project_staff_commission` VALUES ('1', '1', '1', '3', '2', '4', '1.00', '0.00', '测试分工', '', '1508224759', '1508224759');
INSERT INTO `s_project_staff_commission` VALUES ('2', '1', '1', '3', '1', '3', '3.00', '0.00', '测试分工2', '', '1508224759', '1508224759');
INSERT INTO `s_project_staff_commission` VALUES ('3', '1', '1', '4', '2', '4', '12.00', '0.00', '测试分工', '修改工作内容', '1508306603', '1508306603');
INSERT INTO `s_project_staff_commission` VALUES ('4', '1', '1', '4', '1', '3', '34.00', '0.00', '测试分工2', '', '1508306603', '1508306603');

-- -----------------------------
-- Table structure for `s_project_work_commission`
-- -----------------------------
DROP TABLE IF EXISTS `s_project_work_commission`;
CREATE TABLE `s_project_work_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `project_commission_id` int(10) unsigned NOT NULL COMMENT '计提基本信息表ID',
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '工程负责人ID',
  `commission_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '工种计提比例',
  `commission_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '工种计提金额',
  `is_submit` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '提交状态：0-待提交，1-已提交',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-待审核，1-已审核，2-审核不通过',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_project_work_commission`
-- -----------------------------
INSERT INTO `s_project_work_commission` VALUES ('1', '1', '1', '3', '2', '3', '0.00', '0.00', '0', '0', '1508224759', '1508224759');
INSERT INTO `s_project_work_commission` VALUES ('2', '1', '1', '3', '1', '2', '0.00', '0.00', '0', '0', '1508224759', '1508224759');
INSERT INTO `s_project_work_commission` VALUES ('3', '1', '1', '4', '2', '3', '0.00', '0.00', '0', '0', '1508306603', '1508306603');
INSERT INTO `s_project_work_commission` VALUES ('4', '1', '1', '4', '1', '2', '33.00', '0.00', '1', '0', '1508306603', '1508306603');

-- -----------------------------
-- Table structure for `s_receipt`
-- -----------------------------
DROP TABLE IF EXISTS `s_receipt`;
CREATE TABLE `s_receipt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `receive` decimal(12,2) NOT NULL COMMENT '收款金额',
  `cause` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '事由',
  `receive_time` int(10) unsigned NOT NULL COMMENT '收款时间',
  `s_id` int(10) unsigned NOT NULL COMMENT '项目进度阶段ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_receipt`
-- -----------------------------
INSERT INTO `s_receipt` VALUES ('1', '10000.00', '高利收款！！', '1507877473', '1', '1507879923');
INSERT INTO `s_receipt` VALUES ('2', '6000.00', '高利收款！！!!!!', '1507877474', '1', '1507880104');
INSERT INTO `s_receipt` VALUES ('3', '2333.00', '高利收款！！!!!!', '1507877476', '1', '1507880114');
INSERT INTO `s_receipt` VALUES ('4', '2333.00', '高利收款！！!!!!', '1507877478', '1', '1507880117');
INSERT INTO `s_receipt` VALUES ('5', '2333.00', '高利收款！！!!!!', '1507877479', '1', '1507880117');
INSERT INTO `s_receipt` VALUES ('6', '2333.00', '高利收款！！!!!!', '1507877474', '1', '1507880118');
INSERT INTO `s_receipt` VALUES ('7', '2333.00', '高利收款！！!!!!', '1507877411', '1', '1507880119');
INSERT INTO `s_receipt` VALUES ('8', '2333.00', '高利收款！！!!!!', '1507877454', '1', '1507880119');
INSERT INTO `s_receipt` VALUES ('9', '2333.00', '高利收款！！!!!!', '1507877479', '1', '1507880120');
INSERT INTO `s_receipt` VALUES ('10', '2333.00', '高利收款！！!!!!', '1507877473', '1', '1507880121');
INSERT INTO `s_receipt` VALUES ('11', '1.00', '高利收款！！!!!!', '1507877473', '1', '1507880295');
INSERT INTO `s_receipt` VALUES ('12', '85335.00', '高利收款！！!!!!', '1507877473', '1', '1507880316');
INSERT INTO `s_receipt` VALUES ('13', '0.00', '高利收款！！!!!!', '1507877473', '1', '1507880323');
INSERT INTO `s_receipt` VALUES ('14', '0.00', '高利收款！！!!!!', '1507877473', '1', '1507880475');
INSERT INTO `s_receipt` VALUES ('15', '0.00', '高利收款！！!!!!', '1507877473', '2', '1507880991');
INSERT INTO `s_receipt` VALUES ('16', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881235');
INSERT INTO `s_receipt` VALUES ('17', '100000.00', '高利收款！！!!!!', '1507877473', '2', '1507881239');
INSERT INTO `s_receipt` VALUES ('18', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881249');
INSERT INTO `s_receipt` VALUES ('19', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881249');
INSERT INTO `s_receipt` VALUES ('20', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881250');
INSERT INTO `s_receipt` VALUES ('21', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881250');
INSERT INTO `s_receipt` VALUES ('22', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881251');
INSERT INTO `s_receipt` VALUES ('23', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881251');
INSERT INTO `s_receipt` VALUES ('24', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881252');
INSERT INTO `s_receipt` VALUES ('25', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881252');
INSERT INTO `s_receipt` VALUES ('26', '10000.00', '高利收款！！!!!!', '1507877473', '2', '1507881309');
INSERT INTO `s_receipt` VALUES ('27', '1000.00', '高利收款！！!!!!', '1507877473', '3', '1507882636');

-- -----------------------------
-- Table structure for `s_recycled`
-- -----------------------------
DROP TABLE IF EXISTS `s_recycled`;
CREATE TABLE `s_recycled` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned NOT NULL COMMENT '对应相应的id',
  `kind` tinyint(1) NOT NULL COMMENT '1/任务管理 2/任务 3/通知',
  `type` tinyint(1) NOT NULL COMMENT '1/过程纪要,新任务,新通知 2/出图出差,已读通知,进行中任务 3/发函管理,历史任务,已回复通知 4/图纸归档,已发通知,已发任务',
  `del_time` int(10) DEFAULT '0' COMMENT '删除时间',
  `user_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- -----------------------------
-- Records of `s_recycled`
-- -----------------------------
INSERT INTO `s_recycled` VALUES ('1', '1', '2', '4', '1508226943', '1');
INSERT INTO `s_recycled` VALUES ('2', '12', '2', '4', '1508227000', '1');
INSERT INTO `s_recycled` VALUES ('3', '10', '2', '4', '1508227175', '1');
INSERT INTO `s_recycled` VALUES ('4', '2', '2', '3', '1508235768', '1');
INSERT INTO `s_recycled` VALUES ('5', '3', '2', '3', '1508235927', '1');
INSERT INTO `s_recycled` VALUES ('7', '1', '1', '1', '1508241279', '1');
INSERT INTO `s_recycled` VALUES ('8', '4', '2', '1', '1508289233', '1');
INSERT INTO `s_recycled` VALUES ('9', '1', '2', '4', '1508290026', '1');
INSERT INTO `s_recycled` VALUES ('10', '14', '2', '4', '1508290032', '1');
INSERT INTO `s_recycled` VALUES ('11', '4', '3', '4', '1508308624', '1');
INSERT INTO `s_recycled` VALUES ('12', '5', '3', '4', '1508309708', '1');
INSERT INTO `s_recycled` VALUES ('13', '6', '3', '4', '1508309963', '1');
INSERT INTO `s_recycled` VALUES ('14', '4', '2', '4', '1508319805', '');
INSERT INTO `s_recycled` VALUES ('15', '5', '2', '4', '1508319805', '');

-- -----------------------------
-- Table structure for `s_role_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_role_type`;
CREATE TABLE `s_role_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='后台角色类型表';

-- -----------------------------
-- Records of `s_role_type`
-- -----------------------------
INSERT INTO `s_role_type` VALUES ('1', '用户角色1');
INSERT INTO `s_role_type` VALUES ('2', '用户角色2');
INSERT INTO `s_role_type` VALUES ('3', '用户角色3');
INSERT INTO `s_role_type` VALUES ('4', '用户角色4');
INSERT INTO `s_role_type` VALUES ('5', '用户角色5');
INSERT INTO `s_role_type` VALUES ('6', '角色X');
INSERT INTO `s_role_type` VALUES ('7', '5:go away role!');

-- -----------------------------
-- Table structure for `s_schedule`
-- -----------------------------
DROP TABLE IF EXISTS `s_schedule`;
CREATE TABLE `s_schedule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '阶段名称',
  `content` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '工作内容',
  `money` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '阶段总金额',
  `receive` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '已收款',
  `process` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '过程记录',
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-进行中，1-已完成',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_schedule`
-- -----------------------------
INSERT INTO `s_schedule` VALUES ('1', '第一个阶段', 'sixsixsix', '5500.00', '120000.00', '', '1', '1', '1507780399', '1507780399');
INSERT INTO `s_schedule` VALUES ('2', '项目第二阶段', '完成三分之一的搭建', '200000.00', '200000.00', '', '1', '1', '1507780399', '1507780399');
INSERT INTO `s_schedule` VALUES ('3', '项目第一阶段', '搭好基础建设', '120000.00', '1000.00', '', '2', '0', '1507865659', '1507865659');
INSERT INTO `s_schedule` VALUES ('4', '项目第二阶段', '完成三分之一的搭建', '200000.00', '0.00', '', '2', '0', '1507865659', '1507865659');
INSERT INTO `s_schedule` VALUES ('5', '项目第一阶段', '搭好基础建设', '120000.00', '0.00', '', '3', '0', '1507865678', '1507865678');
INSERT INTO `s_schedule` VALUES ('6', '项目第二阶段', '完成三分之一的搭建', '200000.00', '0.00', '', '3', '0', '1507865678', '1507865678');
INSERT INTO `s_schedule` VALUES ('7', '项目第一阶段', '搭好基础建设', '120000.00', '0.00', '', '4', '0', '1507865736', '1507865736');
INSERT INTO `s_schedule` VALUES ('8', '项目第二阶段', '完成三分之一的搭建', '200000.00', '0.00', '', '4', '0', '1507865736', '1507865736');
INSERT INTO `s_schedule` VALUES ('9', '项目第一阶段', '搭好基础建设', '120000.00', '0.00', '', '5', '0', '1507865743', '1507865743');
INSERT INTO `s_schedule` VALUES ('10', '项目第二阶段', '完成三分之一的搭建', '200000.00', '0.00', '', '5', '0', '1507865743', '1507865743');
INSERT INTO `s_schedule` VALUES ('11', '这个是第三个阶段！！', '这个是服务内容介绍。', '1000011.00', '0.00', '123dddlllllldfdsfasdf', '1', '0', '1507883310', '0');
INSERT INTO `s_schedule` VALUES ('12', '这个是最后一个阶段', '2333333', '50000.00', '0.00', '123dddlllllldfdsfasdf', '1', '0', '1507883385', '1507883385');
INSERT INTO `s_schedule` VALUES ('13', '879', '789879', '7897.00', '0.00', '', '6', '0', '1508115019', '1508115019');
INSERT INTO `s_schedule` VALUES ('14', '8797', '789879', '7897.00', '0.00', '', '6', '0', '1508115019', '1508115019');
INSERT INTO `s_schedule` VALUES ('15', '879', '789879', '7897.00', '0.00', '', '7', '0', '1508115022', '1508115022');
INSERT INTO `s_schedule` VALUES ('16', '8797', '789879', '7897.00', '0.00', '', '7', '0', '1508115022', '1508115022');
INSERT INTO `s_schedule` VALUES ('17', '879', '789879', '7897.00', '0.00', '', '8', '0', '1508115028', '1508115028');
INSERT INTO `s_schedule` VALUES ('18', '8797', '789879', '7897.00', '0.00', '', '8', '0', '1508115028', '1508115028');
INSERT INTO `s_schedule` VALUES ('19', '879', '789879', '7897.00', '0.00', '', '9', '0', '1508115066', '1508115066');
INSERT INTO `s_schedule` VALUES ('20', '8797', '789879', '7897.00', '0.00', '', '9', '0', '1508115066', '1508115066');
INSERT INTO `s_schedule` VALUES ('21', '879', '789879', '7897.00', '0.00', '', '10', '0', '1508115072', '1508115072');
INSERT INTO `s_schedule` VALUES ('22', '8797', '789879', '7897.00', '0.00', '', '10', '0', '1508115072', '1508115072');
INSERT INTO `s_schedule` VALUES ('23', '第一阶段', '很好', '50.88', '0.00', '', '11', '0', '1508120138', '1508120138');
INSERT INTO `s_schedule` VALUES ('24', '第二阶段', '很好', '50.88', '0.00', '', '11', '0', '1508120138', '1508120138');
INSERT INTO `s_schedule` VALUES ('25', '第一阶段', '哈哈哈', '123.00', '0.00', '', '12', '0', '1508206763', '1508206763');
INSERT INTO `s_schedule` VALUES ('26', 'second', '哈哈哈', '123.00', '0.00', '', '12', '0', '1508206763', '1508206763');
INSERT INTO `s_schedule` VALUES ('27', '年少出天门', '武松打虎', '10.00', '0.00', '', '13', '0', '1508219416', '1508219416');
INSERT INTO `s_schedule` VALUES ('28', '214', '武松打虎', '10.00', '0.00', '', '13', '0', '1508219416', '1508219416');
INSERT INTO `s_schedule` VALUES ('29', '第一阶段', 'werw', '1212.00', '0.00', '', '17', '0', '1508221218', '1508221218');

-- -----------------------------
-- Table structure for `s_staff`
-- -----------------------------
DROP TABLE IF EXISTS `s_staff`;
CREATE TABLE `s_staff` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `work_id` int(10) NOT NULL DEFAULT '0' COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `labor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分工情况',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '工作内容',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_staff`
-- -----------------------------
INSERT INTO `s_staff` VALUES ('1', '1', '4', '测试分工', '修改工作内容', '1', '1507950928', '1508246216');
INSERT INTO `s_staff` VALUES ('2', '1', '3', '测试分工2', '', '1', '1507950973', '1507950973');
INSERT INTO `s_staff` VALUES ('3', '3', '3', '测试分工2', '', '3', '1507952445', '1507952445');

-- -----------------------------
-- Table structure for `s_stage_types`
-- -----------------------------
DROP TABLE IF EXISTS `s_stage_types`;
CREATE TABLE `s_stage_types` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `s_stage_types`
-- -----------------------------
INSERT INTO `s_stage_types` VALUES ('1', '项目进行中');
INSERT INTO `s_stage_types` VALUES ('2', '项目第一阶段');
INSERT INTO `s_stage_types` VALUES ('3', '项目第二阶段');
INSERT INTO `s_stage_types` VALUES ('4', '项目完工');

-- -----------------------------
-- Table structure for `s_task`
-- -----------------------------
DROP TABLE IF EXISTS `s_task`;
CREATE TABLE `s_task` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `type` int(10) unsigned NOT NULL COMMENT '类型ID',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务标题',
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附件原名称',
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附件',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务内容',
  `reply` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回复内容',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `start_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务开始时间',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 (默认0 1是接受 2是拒绝 3是完成 4是删除)',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `to_user` int(10) NOT NULL COMMENT '接收者',
  `update_at` int(10) DEFAULT '0' COMMENT '比如接收任务或者拒绝任务时的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_task`
-- -----------------------------
INSERT INTO `s_task` VALUES ('1', '1', '1', 'test tile', 'default', '/Uploads/task/2017-10-16/rp9qp57794n1n.png', 'test content', '', '1', '2017-01-01', '4', '1508145868', '1', '0');
INSERT INTO `s_task` VALUES ('2', '1', '1', 'test tile', 'default', '/Uploads/task/2017-10-16/s4oo7rqp419s5.png', 'test content', '', '1', '2017-01-01', '1', '1508146111', '1', '0');
INSERT INTO `s_task` VALUES ('3', '1', '1', 'test tile', 'default', '/Uploads/task/2017-10-16/p435qr69s728o.png', 'test content', '奥术大师', '1', '2017-01-01', '1', '1508146172', '1', '1508233112');
INSERT INTO `s_task` VALUES ('4', '1', '1', 'test tile', 'default', '/Uploads/task/2017-10-17/64p5n9r477599.png', 'test content', '啊啊啊', '1', '2017-01-01', '4', '1508210330', '1', '1508233664');
INSERT INTO `s_task` VALUES ('5', '1', '1', 'test tile', 'default', '/Uploads/task/2017-10-17/38r6n9or055q7.png', 'test content', '啧啧啧', '1', '2017-01-01', '4', '1508210750', '1', '1508234997');
INSERT INTO `s_task` VALUES ('6', '1', '1', '测试标题', '', 'undefined', '内容测试测试', '', '1', '2017-09-09', '1', '1508210827', '1', '0');
INSERT INTO `s_task` VALUES ('7', '1', '1', '测试标题', '', 'undefined', '内容测试测试', '啊啊啊', '1', '2017-09-09', '1', '1508210827', '1', '1508233205');
INSERT INTO `s_task` VALUES ('8', '1', '1', '测试标题', '', '[附件]', '内容测试测试', 'sad', '1', '2017-09-09', '1', '1508211022', '1', '1508233139');
INSERT INTO `s_task` VALUES ('9', '1', '1', '啊啊啊啊啊', '', 'C:\\fakepath\\canvas.txt', '啊啊啊啊啊啊啊啊啊啊', '', '1', '2017-10-18', '1', '1508211085', '7', '0');
INSERT INTO `s_task` VALUES ('10', '1', '1', 'AS啊', '', '', '潇洒下大师傅', '', '1', '2017-10-11', '1', '1508211258', '10', '0');
INSERT INTO `s_task` VALUES ('11', '1', '1', '阿三', '', '', 'A撒', '', '1', '2017-10-17', '1', '1508212015', '2', '0');
INSERT INTO `s_task` VALUES ('12', '1', '1', '测试股', '', '', '阿萨德', '', '1', '2017-10-18', '1', '1508212063', '10', '0');
INSERT INTO `s_task` VALUES ('13', '1', '9', 'zzz', '', 'C:\\fakepath\\canvas.txt', '重中之重', '', '1', '2017-10-25', '1', '1508231641', '12', '0');
INSERT INTO `s_task` VALUES ('14', '1', '7', '种子', '', '', '直接在就直接', '', '1', '2017-10-19', '4', '1508231789', '11', '0');

-- -----------------------------
-- Table structure for `s_task_receive`
-- -----------------------------
DROP TABLE IF EXISTS `s_task_receive`;
CREATE TABLE `s_task_receive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '任务接收者id',
  `pid` int(10) NOT NULL COMMENT '对应任务表id',
  `addtime` int(10) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1' COMMENT '1/未接收 2/进行中 3/拒绝任务 4/软删除 5/已完成',
  `receive_time` int(10) DEFAULT '0' COMMENT '接受时间',
  `finish_time` int(10) DEFAULT '0' COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='任务接收表';

-- -----------------------------
-- Records of `s_task_receive`
-- -----------------------------
INSERT INTO `s_task_receive` VALUES ('1', '1', '1', '1508145868', '4', '0', '0');
INSERT INTO `s_task_receive` VALUES ('2', '1', '2', '1508146111', '4', '0', '0');
INSERT INTO `s_task_receive` VALUES ('3', '1', '3', '1508146172', '4', '1508233112', '0');
INSERT INTO `s_task_receive` VALUES ('4', '1', '4', '1508210330', '4', '1508233664', '0');
INSERT INTO `s_task_receive` VALUES ('5', '1', '5', '1508210750', '3', '1508234997', '0');
INSERT INTO `s_task_receive` VALUES ('6', '1', '6', '1508210827', '3', '1508235175', '0');
INSERT INTO `s_task_receive` VALUES ('7', '1', '7', '1508210827', '2', '1508233205', '0');
INSERT INTO `s_task_receive` VALUES ('8', '1', '8', '1508211022', '2', '1508233139', '0');
INSERT INTO `s_task_receive` VALUES ('9', '7', '9', '1508211085', '1', '0', '0');
INSERT INTO `s_task_receive` VALUES ('10', '10', '10', '1508211258', '4', '0', '0');
INSERT INTO `s_task_receive` VALUES ('11', '2', '11', '1508212015', '1', '0', '0');
INSERT INTO `s_task_receive` VALUES ('12', '10', '12', '1508212063', '4', '0', '0');
INSERT INTO `s_task_receive` VALUES ('13', '12', '13', '1508231641', '1', '0', '0');
INSERT INTO `s_task_receive` VALUES ('14', '11', '14', '1508231789', '1', '0', '0');

-- -----------------------------
-- Table structure for `s_task_type`
-- -----------------------------
DROP TABLE IF EXISTS `s_task_type`;
CREATE TABLE `s_task_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='任务类型表';

-- -----------------------------
-- Records of `s_task_type`
-- -----------------------------
INSERT INTO `s_task_type` VALUES ('1', '11111');
INSERT INTO `s_task_type` VALUES ('2', '11111');
INSERT INTO `s_task_type` VALUES ('3', 'r');
INSERT INTO `s_task_type` VALUES ('4', 'wlyttttt');
INSERT INTO `s_task_type` VALUES ('5', '支出-文具');
INSERT INTO `s_task_type` VALUES ('6', '支出-文具');
INSERT INTO `s_task_type` VALUES ('7', 'df');
INSERT INTO `s_task_type` VALUES ('8', '任务');
INSERT INTO `s_task_type` VALUES ('9', '通知类型5');
INSERT INTO `s_task_type` VALUES ('10', '通知类型5');

-- -----------------------------
-- Table structure for `s_user`
-- -----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` char(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `nickname` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `pic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/Uploads/default.png' COMMENT '用户头像',
  `sex` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '性别（默认0，0：保密，1：男，2女）',
  `birthday` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '出生年月',
  `worktime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参加工作时间',
  `school` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '毕业院校',
  `edu` tinyint(4) NOT NULL DEFAULT '0' COMMENT '学历默认0，0：小学，1：初中，2：中专，3：高中，4：大专，5：本科，6：研究生7：硕士8：博士：9其他',
  `position` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '职称',
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `qq` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'QQ号码',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除（默认0，1表示删除）',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注信息',
  `work_type` int(10) unsigned NOT NULL COMMENT '工种ID',
  `authority` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限ID',
  `role` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '角色ID',
  `administer` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否管理层（默认0,1表示是）',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `is_super` tinyint(1) DEFAULT '0' COMMENT '0/非超级管理员 1/超级管理员',
  `del_time` int(10) DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_user`
-- -----------------------------
INSERT INTO `s_user` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '李四', '/Uploads/default.png', '1', '1990-03-04', '2014-07-01', '清华大学', '0', '工程师', '123123111', '88888', '0', '', '1', '1,2,3,4,5,6,7', '1', '0', '1507790295', '0', '1', '0');
INSERT INTO `s_user` VALUES ('2', 'JayChou', '21232f297a57a5a743894a0e4a801fc3', '周杰伦mmmm', '/Uploads/default.png', '1', '2000-01-01', '2017-01-27', '中山大学', '1', '11', '13744465756', '654654658', '0', '', '1', '1,2,3,5', '2', '1', '1507790505', '0', '0', '0');
INSERT INTO `s_user` VALUES ('3', 'adminS', '21232f297a57a5a743894a0e4a801fc3', 'CEO', '/Uploads/default.png', '0', '2011-11-11', '2011-11-11', '中山大学', '0', '开发人员', '13126549711', '5694123', '0', '', '3', '1,2,3', '1', '0', '1507791079', '0', '0', '0');
INSERT INTO `s_user` VALUES ('4', 'wangluyao', '46f94c8de14fb36680850768ff1b7f2a', 'wly555', '/Uploads/default.png', '1', '2017-10-08', '2017-10-10', 'university', '0', '高中', '13725309730', '1487238516', '0', '', '4', '2', '1', '1', '1507874072', '0', '0', '0');
INSERT INTO `s_user` VALUES ('5', 'asgdfgh', 'd99d52d4f73e3a88496534bab1ba8a44', 'sgfsgd', '/Uploads/default.png', '0', '2017-09-01', '2017-09-01', 'dfadfsd', '0', '2', '15645634765', '465437', '1', '', '7', '1,2,3', '1', '0', '1508070926', '0', '0', '0');
INSERT INTO `s_user` VALUES ('6', 'wanke', '07514cdc2d802f0f99b922cdad6c24e7', '万科', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '浙江农林大学', '0', '10', '13744465756', '56425645', '0', '', '9', '1,2,3', '1', '0', '1508071399', '0', '0', '0');
INSERT INTO `s_user` VALUES ('7', '5', 'e35cf7b66449df565f93c607d5a81d09', '王璐瑶哈哈哈', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '铁一中', '0', '5', '18537465364', '6345346', '0', '', '5', '1,2,3', '1', '0', '1508072116', '0', '0', '0');
INSERT INTO `s_user` VALUES ('8', 'wly2', 'e35cf7b66449df565f93c607d5a81d09', '王璐瑶', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '铁一中', '6', '4', '18537465364', '6345346', '1', '', '5', '1,2,3', '1', '0', '1508072152', '0', '0', '0');
INSERT INTO `s_user` VALUES ('9', 'wly3', 'e35cf7b66449df565f93c607d5a81d09', '王璐瑶', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '铁一中', '6', '4', '18537465364', '6345346', '1', '', '5', '1,2,3', '1', '0', '1508072191', '0', '0', '0');
INSERT INTO `s_user` VALUES ('10', '1', 'e35cf7b66449df565f93c607d5a81d09', '王璐瑶5', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '铁一中', '0', '1', '18537465364', '6345346', '0', '', '1', '1,2,3', '1', '0', '1508072335', '0', '0', '0');
INSERT INTO `s_user` VALUES ('11', '10', '9c4cdebf4401eacfa1a4177de47ef700', '王璐遥', '/Uploads/default.png', '0', '2017-09-01', '2017-09-01', '浙江大学', '0', '1', '13723453324', '345678906', '0', '', '1', '1,2,3', '1', '0', '1508072484', '0', '0', '0');
INSERT INTO `s_user` VALUES ('12', '输入职称', '4e6d1a51f32c78595e4ca509bf711663', '王璐遥', '/Uploads/default.png', '1', '2017-09-01', '2017-09-01', '浙江理工大学', '0', '1', '13574865468', '46363643', '0', '', '1', '1,2,3', '1', '0', '1508072644', '0', '0', '0');
INSERT INTO `s_user` VALUES ('13', 'test', '674f3c2c1a8a6f90461e8a66fb5550ba', '斯蒂芬', '/Uploads/default.png', '0', '2017-09-01', '2017-09-01', '大学', '7', '2', '18524363464', '546456234', '0', '', '3', '1,2,3', '1', '0', '1508145913', '0', '0', '0');
INSERT INTO `s_user` VALUES ('14', '213312', '5a228c96a65ba383632c1ee156ef4dd3', '张三', '/Uploads/default.png', '1', '1994-06-12', '2001-01-01', '中山大学', '0', '1', '13168941033', '89641534', '0', '', '1', '1,3', '1', '0', '1508298067', '0', '0', '0');
INSERT INTO `s_user` VALUES ('15', 'account', '5a228c96a65ba383632c1ee156ef4dd3', '张三', '/Uploads/default.png', '1', '1994-06-12', '2001-01-01', '中山大学', '4', '开发人员', '13168941033', '89641534', '0', '', '1', '1,2', '1', '0', '1508318179', '0', '0', '0');
INSERT INTO `s_user` VALUES ('16', 'qweqwe', '96e79218965eb72c92a549dd5a330112', 'sadasd', '/Uploads/default.png', '1', '2017-10-10', '2017-10-09', 'hafo', '2', 'sadasd', '13330114238', '577815886', '0', '', '4', '1,3', '1', '0', '1508318315', '0', '0', '0');
INSERT INTO `s_user` VALUES ('17', 'libai', '49299ca918b02a430d8e677cbaea192d', '李白', '/Uploads/default.png', '0', '2017-10-03', '2017-10-02', 'asdasd', '0', 'asdad', '13330114235', '57841166', '0', '', '1', '1,2,3', '1', '0', '1508318390', '0', '0', '0');

-- -----------------------------
-- Table structure for `s_user_token`
-- -----------------------------
DROP TABLE IF EXISTS `s_user_token`;
CREATE TABLE `s_user_token` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL COMMENT '用户ID',
  `token` varchar(50) DEFAULT NULL COMMENT 'token值',
  `add_time` int(10) DEFAULT '0' COMMENT '生成时间',
  `expire_time` int(10) DEFAULT '0' COMMENT '过期时间',
  PRIMARY KEY (`id`),
  KEY `indexs` (`user_id`,`token`,`expire_time`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户token表';

-- -----------------------------
-- Records of `s_user_token`
-- -----------------------------
INSERT INTO `s_user_token` VALUES ('1', '1', '40dc7bdc8db05a1d71785f3ac49cd8cf', '1507792080', '1508922143');

-- -----------------------------
-- Table structure for `s_work`
-- -----------------------------
DROP TABLE IF EXISTS `s_work`;
CREATE TABLE `s_work` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型（默认0 1是自定义工种）',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `index` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- Records of `s_work`
-- -----------------------------
INSERT INTO `s_work` VALUES ('1', '规格负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('2', '方案负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('3', '建筑负责 ', '0', '1507780399');
INSERT INTO `s_work` VALUES ('4', '结构负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('5', '电气负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('6', '排水负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('7', '暖通负责', '0', '1507780399');
INSERT INTO `s_work` VALUES ('8', '9990', '1', '1507780399');
INSERT INTO `s_work` VALUES ('9', '景观设计', '1', '1507780399');
INSERT INTO `s_work` VALUES ('10', '5555', '1', '1507963230');
INSERT INTO `s_work` VALUES ('11', '9990', '1', '1507965441');
INSERT INTO `s_work` VALUES ('12', 'wly', '1', '1507965631');
INSERT INTO `s_work` VALUES ('13', 'wly2', '1', '1507965642');
INSERT INTO `s_work` VALUES ('14', '客服', '1', '1508208775');
INSERT INTO `s_work` VALUES ('15', '客服8', '1', '1508208798');
