/**
 * @fileoverview Generating JavaScript for robot blocks.
 * @author jstn@cs.washington.edu (Justin Huang)
 */
'use strict';

goog.provide('Blockly.JavaScript.robot');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['robot_display_message_h2'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA);
  var code = 'robot.displayMessage(' + value_text + ', \'\');\n';
  return code;
};

Blockly.JavaScript['robot_display_message_h1h2'] = function(block) {
  var value_h1_text = Blockly.JavaScript.valueToCode(block, 'H1_TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_h2_text = Blockly.JavaScript.valueToCode(block, 'H2_TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.displayMessage(' + value_h1_text + ', ' + value_h2_text + ');\n';
  return code;
};

// DEPRECATED
Blockly.JavaScript['robot_display_ask_multiple_choice'] = function(block) {
  var value_question = Blockly.JavaScript.valueToCode(block, 'QUESTION', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_choices = Blockly.JavaScript.valueToCode(block, 'CHOICES', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  //var value_timeout = Blockly.JavaScript.valueToCode(block, 'TIMEOUT', Blockly.JavaScript.ORDER_COMMA) || 0;
  var code = 'robot.askMultipleChoice(' + value_question + ', ' + value_choices + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_display_ask_choice'] = function(block) {
  var value_question = Blockly.JavaScript.valueToCode(block, 'QUESTION', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_choices = Blockly.JavaScript.valueToCode(block, 'CHOICES', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.askMultipleChoice(' + value_question + ', ' + value_choices + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['robot_display_wait_for_button_press'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_button = Blockly.JavaScript.valueToCode(block, 'BUTTON', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  //var value_timeout = Blockly.JavaScript.valueToCode(block, 'TIMEOUT', Blockly.JavaScript.ORDER_COMMA) || 0;
  var code = 'robot.askMultipleChoice(' + value_text + ', [' + value_button + '], ' + value_timeout + ');\n';
  return code;
};

Blockly.JavaScript['robot_display_wait_for_button'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_button = Blockly.JavaScript.valueToCode(block, 'BUTTON', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.askMultipleChoice(' + value_text + ', [' + value_button + ']);\n';
  return code;
};

Blockly.JavaScript['robot_movement_go_to'] = function(block) {
  var value_location = Blockly.JavaScript.valueToCode(block, 'LOCATION', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'robot.goTo(' + value_location + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_locations'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = Blockly.JavaScript.quote_(dropdown_name);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['robot_movement_go_to_dock'] = function(block) {
  var code = 'robot.goToDock()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_sound_say'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'robot.say(' + value_text + ');\n';
  return code;
};

Blockly.JavaScript['robot_head_look_angles'] = function(block) {
  var angle_up = block.getFieldValue('UP') || '0';
  var angle_left = block.getFieldValue('LEFT') || '0';
  var code = 'robot.lookAtDegrees(' + angle_up + ', ' + angle_left + ');\n';
  return code;
};

Blockly.JavaScript['robot_perception_object_attributes'] = function(block) {
  var dropdown_attribute = block.getFieldValue('ATTRIBUTE') || '';
  var value_object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_MEMBER) || 'null';
  var code;
  if (dropdown_attribute === 'X') {
    code = value_object + '.pose.pose.position.x';
  } else if (dropdown_attribute === 'Y') {
    code = value_object + '.pose.pose.position.y';
  } else if (dropdown_attribute === 'Z') {
    code = value_object + '.pose.pose.position.z';
  } else if (dropdown_attribute === 'LONGSIDEATTRIBUTE') {
    code = value_object + '.scale.x';
  } else if (dropdown_attribute === 'SHORTSIDEATTRIBUTE') {
    code = value_object + '.scale.y';
  } else if (dropdown_attribute === 'HEIGHT') {
    code = value_object + '.scale.z';
  } else {
    code = 'null';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }

  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['robot_perception_custom_landmarks'] = function(block) {
  var dropdown_landmark_id = block.getFieldValue('LANDMARK');
  var code = Blockly.JavaScript.quote_(dropdown_landmark_id);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['robot_perception_find_custom_landmark'] = function(block) {
  var value_landmark = Blockly.JavaScript.valueToCode(block, 'LANDMARK', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var checkbox_is_tabletop = block.getFieldValue('IS_TABLETOP') == 'TRUE';
  var code = 'robot.findCustomLandmark(' + value_landmark + ', ' + checkbox_is_tabletop + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_movement_tuck_arms'] = function(block) {
  var dropdown_left_action = block.getFieldValue('LEFT_ACTION');
  var dropdown_right_action = block.getFieldValue('RIGHT_ACTION');
  var left_action = 'true';
  if (dropdown_left_action === 'DEPLOY') {
    left_action = 'false';
  }
  var right_action = 'true';
  if (dropdown_right_action === 'DEPLOY') {
    right_action = 'false';
  }
  var code = 'robot.tuckArms(' + left_action + ', ' + right_action + ');\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_open_gripper'] = function(block) {
  var code = 'robot.openGripper();\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_close_gripper_with_effort'] = function(block) {
  var number_force = block.getFieldValue('FORCE') || 120;
  var code = 'robot.closeGripper(' + number_force + ');\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_set_gripper'] = function(block) {
  var dropdown_action = block.getFieldValue('ACTION') || 'OPEN';
  var dropdown_side = block.getFieldValue('SIDE') || 'LEFT';
  var side = 0;
  var side = '';
  if (dropdown_side === 'LEFT') {
    side = 'Left';
  } else if (dropdown_side === 'RIGHT') {
    side = 'Right';
  }
  var action = '';
  if (dropdown_action === 'OPEN') {
    action = 'open';
  } else if (dropdown_action === 'CLOSE') {
    action = 'close';
  }
  var code = 'robot.' + action + side + 'Gripper();\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_set_right_gripper_with_effort'] = function(block) {
  var number_force = block.getFieldValue('FORCE') || -1;
  var code = 'robot.closeRightGripper(' + number_force + ');\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_is_gripper_open'] = function(block) {
  var dropdown_gripper = block.getFieldValue('GRIPPER') || '';
  var dropdown_state = block.getFieldValue('STATE') || 'OPEN';
  var side = '';
  if (dropdown_gripper === 'LEFT') {
    side = 'Left';
  } else if (dropdown_gripper === 'RIGHT') {
    side = 'Right';
  }
  var code = 'robot.is' + side + 'GripperOpen()';
  var order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
  if (dropdown_state !== 'OPEN') {
    code = '!' + code;
    order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  }
  return [code, order];
};

Blockly.JavaScript['robot_manipulation_pbd_actions'] = function(block) {
  var dropdown_action_id = block.getFieldValue('ACTION_ID');
  var code = Blockly.JavaScript.quote_(dropdown_action_id);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['robot_manipulation_run_pbd_action'] = function(block) {
  var value_action_id = Blockly.JavaScript.valueToCode(block, 'ACTION_ID', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var preregistered = '{'
  for (var i=0; i<block.landmarks_.length; i++) {
    var id = block.landmarks_[i][1];
    var value_landmark = Blockly.JavaScript.valueToCode(block, 'LANDMARK' + i, Blockly.JavaScript.ORDER_COMMA) || 'null';

    preregistered += Blockly.JavaScript.quote_(id) + ': ' + value_landmark;
    if (i < block.landmarks_.length-1) {
      preregistered += ', ';
    }
  }
  preregistered += '}';
  var code = 'robot.runPbdAction(' + value_action_id + ', ' + preregistered + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_manipulation_run_pbd_program'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'robot.runRapidPbdProgram(' + value_name + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_pbd_programs'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = Blockly.JavaScript.quote_(dropdown_name);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['robot_manipulation_move_head'] = function(block) {
  var value_pan = Blockly.JavaScript.valueToCode(block, 'PAN', Blockly.JavaScript.ORDER_COMMA);
  var value_tilt = Blockly.JavaScript.valueToCode(block, 'TILT', Blockly.JavaScript.ORDER_COMMA);
  var code = 'robot.moveHead(' + value_pan + ', ' + value_tilt + ');\n';
  return code;
};

Blockly.JavaScript['robot_manipulation_set_torso'] = function(block) {
  var value_height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.setTorso(' + value_height + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_timer'] = function(block) {
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_NONE) || 0;
  var code = 'startTimer(' + value_seconds + ');\n';
  return code;
};

Blockly.JavaScript['robot_wait_for_seconds'] = function(block) {
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_NONE) || 0;
  var code = 'waitForDuration(' + value_seconds + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_torso'] = function(block) {
  var value_height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_NONE);
  var code = 'robot.startTorso(' + value_height + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_head'] = function(block) {
  var value_pan = Blockly.JavaScript.valueToCode(block, 'PAN', Blockly.JavaScript.ORDER_COMMA);
  var value_tilt = Blockly.JavaScript.valueToCode(block, 'TILT', Blockly.JavaScript.ORDER_COMMA);
  var code = 'robot.startHead(' + value_pan + ', ' + value_tilt + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_open_gripper'] = function(block) {
  var code = 'robot.startOpenGripper();\n';
  return code;
};

Blockly.JavaScript['robot_start_close_gripper'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'FORCE', Blockly.JavaScript.ORDER_NONE);
  var code = 'robot.startCloseGripper(' + value_name + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_ask_mc'] = function(block) {
  var value_question = Blockly.JavaScript.valueToCode(block, 'QUESTION', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_choices = Blockly.JavaScript.valueToCode(block, 'CHOICES', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.startAskMultipleChoice(' + value_question + ', ' + value_choices + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_display_message_h2'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.startDisplayMessage(' + value_text + ', \'\');\n';
  return code;
};

Blockly.JavaScript['robot_start_display_message_h1h2'] = function(block) {
  var value_h1_text = Blockly.JavaScript.valueToCode(block, 'H1_TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_h2_text = Blockly.JavaScript.valueToCode(block, 'H2_TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var code = 'robot.startDisplayMessage(' + value_h1_text + ', ' + value_h2_text + ');\n';
  return code;
};


Blockly.JavaScript['robot_start_go_to'] = function(block) {
  var value_location = Blockly.JavaScript.valueToCode(block, 'LOCATION', Blockly.JavaScript.ORDER_COMMA);
  var code = 'robot.startGoTo(' + value_location + ');\n';
  return code;
};

Blockly.JavaScript['robot_start_rapid_pbd'] = function(block) {
  var value_program = Blockly.JavaScript.valueToCode(block, 'PROGRAM', Blockly.JavaScript.ORDER_COMMA);
  var code = 'robot.startRapidPbD(' + value_program + ');\n';
  return code;
};

Blockly.JavaScript['robot_is_done_fetch'] = function(block) {
  var dropdown_name = Blockly.JavaScript.quote_(block.getFieldValue('NAME'));
  var code = 'robot.isDone(' + dropdown_name + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_wait_for_action_fetch'] = function(block) {
  var dropdown_name = Blockly.JavaScript.quote_(block.getFieldValue('NAME'));
  if (dropdown_name === '\'ALL_ACTIONS\'') {
    var code = 'robot.waitForAction(\'TORSO\');\nrobot.waitForAction(\'HEAD\');\n' + 
	       'robot.waitForAction(\'GRIPPER\');\nrobot.waitForAction(\'QUESTION\');\n' + 
	       'robot.waitForAction(\'NAVIGATION\');\nrobot.waitForAction(\'PBD\');\n';
  } else {
    var code = 'robot.waitForAction(' + dropdown_name + ');\n';
  }
  return code;
};

Blockly.JavaScript['robot_cancel_fetch'] = function(block) {
  var dropdown_name = Blockly.JavaScript.quote_(block.getFieldValue('NAME'));
  var code = 'robot.cancel(' + dropdown_name + ');\n';
  return code;
};

Blockly.JavaScript['robot_get_result'] = function(block) {
  var dropdown_name = Blockly.JavaScript.quote_(block.getFieldValue('NAME'));
  var code = 'robot.getResult(' + dropdown_name + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['slip_gripper'] = function(block) {
  var code = 'robot.slipGripper()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_get_position'] = function(block) {
  var dropdown_name = Blockly.JavaScript.quote_(block.getFieldValue('NAME'));
  var code = 'robot.getPosition(' + dropdown_name + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_get_location'] = function(block) {
  var code = 'robot.getLocation()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['speech_input'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.collectSpeech(' + time + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['speech_input_wake_word'] = function(block) {
  var wake_word = Blockly.JavaScript.valueToCode(block, 'WAKE_WORD', Blockly.JavaScript.ORDER_ATOMIC);
  //var hi = 'ciao';
  //var code = 'robot.collectSpeechWakeWord(' + hi + ')';
  var code = 'robot.collectSpeechWakeWord(' + wake_word + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['speech_contains'] = function(block) {
  var variable_speech_input = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('speech_input'), Blockly.Variables.NAME_TYPE);
  var value_phrase = Blockly.JavaScript.valueToCode(block, 'phrase', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.speechContains(' + variable_speech_input + ', ' + value_phrase + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
